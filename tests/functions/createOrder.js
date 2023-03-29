import { expect } from "@playwright/test";

import parcelData from "../jsons/parcelData.json";
import paymentSberData from "../jsons/paymentSberData.json";
import paymentReceivedData from "../jsons/paymentReceivedData.json";

import { camundaMessage } from "../functions/camundaMessage";
import { sberPay } from "../functions/sberPay";
import { delay } from "../functionsGeneral/delay";

const config = require("../config");

async function createOrder(request, orderData) {
  const orderContext = require("../functionsGeneral/orderContext");
  await delay(3000);
  let response = await request.post(`${config.omsURL}/v2/orders`, {
    data: orderData,
  });
  let responseBody = JSON.parse(await response.text());
  orderContext.orderNumber = responseBody.result.number;
  orderContext.parcelNumber = orderContext.orderNumber + "-001";
  expect(response.status()).toBe(200);
  parcelData.parcel_number[0] = orderContext.parcelNumber;
  await delay(3000);
  response = await request.post(`${config.omsStorage}/v2/parcels:search`, {
    data: parcelData,
  });
  responseBody = JSON.parse(await response.text());
  orderContext.orderId = responseBody.result[0].parent_id;
  orderContext.parcelId = responseBody.result[0].id;
  return orderContext;
}

async function createPaidOrder(request, orderData) {
  const orderContext = await createOrder(request, orderData);
  await delay(3000);
  paymentReceivedData.businessKey = orderContext.orderNumber;
  await camundaMessage(request, paymentReceivedData);
  return orderContext;
}

exports.createPaidSberOrder = async function (request, page, orderData) {
  const orderContext = await createPaidOrder(request, orderData);
  await delay(3000);
  paymentSberData.orderId = orderContext.orderNumber;
  await sberPay(request, page, paymentSberData);
  return orderContext;
};

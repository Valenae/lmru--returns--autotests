import{test, expect, chromium} from '@playwright/test'
import orderData from './jsons/orderData.json'
import paymentReceivedData from './jsons/paymentReceivedData.json'
import parcelData from './jsons/parcelData.json'
import paymentSber from './jsons/paymentSber.json'
import deliveryData from './jsons/deliveryData.json'
import mpReturnData from './jsons/mpReturnData.json'

import {delay} from './functions/delay'
import {createOrder} from './functions/createOrder'
import {camundaMessage} from './functions/camundaMessage'
import {getOrderInfo} from './functions/getOrderInfo'
import {getSberLink} from './functions/getSberLink'
import {confirmParcel} from './functions/confirmParcel'
import {mpReturnCreate} from './functions/mpReturnCreate'

const config = require("./config")

let numbers
let ids
let sberURL
let returnId

test("Create Order", async ({request}) => {
  await delay(5000);
  numbers = await createOrder(request, orderData);
  expect(numbers.orderNumber).toBeDefined;
  expect(numbers.parcelNumber).toBeDefined;
  console.log(numbers);
  });

test("Payment Received", async ({request}) => {
  await delay(5000);
  paymentReceivedData.businessKey = numbers.orderNumber
  await camundaMessage(request, paymentReceivedData);
});

test("Get order info", async ({request}) => {
  await delay(5000);
  parcelData.parcel_number[0] = numbers.parcelNumber
  ids = await getOrderInfo(request, parcelData);
  expect(ids.orderId).toBeDefined;
  expect(ids.parcelId).toBeDefined;
  console.log(ids);
  });

test("Get link and pay", async ({request}) => {
  await delay(5000);
  paymentSber.orderId = numbers.orderNumber
  console.log(paymentSber);
  sberURL = await getSberLink(request, paymentSber);
  console.log(sberURL);
});

test('Payment in Sberbank', async({page}) => {
  await delay(5000);
  await page.goto(sberURL)
  await page.locator('[data-test-id="pan"]').fill('4111 1111 1111 1111');
  await page.locator('[data-test-id="expiry"]').fill('12/24');
  await page.locator('[data-test-id="cvc"]').fill('123');
  await page.locator('[data-test-id="submit-payment"]').click();
  await delay(5000);
  await page.getByPlaceholder('********').fill('12345678');
  await delay(5000);

})

test("Confirm parcel", async ({request}) => {
  let omsPublicAPI = config.omsPublicAPI+numbers.parcelNumber+'/confirm'
  console.log(omsPublicAPI)
  await delay(10000);
  await confirmParcel (request, omsPublicAPI);
});

test("Pack parcel", async ({request}) => {
  let omsPublicAPI = config.omsPublicAPI+numbers.parcelNumber+'/pack'
  console.log(omsPublicAPI)
  await delay(10000);
  await confirmParcel (request, omsPublicAPI);
});

test("Ship parcel", async ({request}) => {
  let omsPublicAPI = config.omsPublicAPI+numbers.parcelNumber+'/ship'
  console.log(omsPublicAPI)
  await delay(10000);
  await confirmParcel (request, omsPublicAPI);
});

test("Delivery to Client", async ({request}) => {
  await delay(10000);
  deliveryData.correlationKeys.parcelStorageID.value = ids.parcelId
  console.log(deliveryData.correlationKeys.parcelStorageID.value)
  await camundaMessage(request, deliveryData);
});

test("Client Return via mp-client-returns-creator", async ({request}) => {
  await delay(5000);
  mpReturnData.parcelStorageId = ids.parcelId
  console.log(mpReturnData);
  returnId = await mpReturnCreate(request, mpReturnData);
  expect(returnId).toBeDefined;
  console.log(returnId);
  });
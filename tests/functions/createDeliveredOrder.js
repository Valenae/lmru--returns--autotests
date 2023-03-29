import { create3PLOrder } from "../functions/create3PLOrder";
import { deliveryToClient } from "../functions/deliveryToClient";

import deliveryData from "../jsons/deliveryData.json";

import { delay } from "../functionsGeneral/delay";

const config = require("../config");

exports.createDeliveredOrder = async function (request, page, orderData) {
  const orderContext = await create3PLOrder(request, page, orderData);
  await delay(3000);
  deliveryData.correlationKeys.parcelStorageID.value = orderContext.parcelId;
  console.log(deliveryData.correlationKeys.parcelStorageID.value);
  await deliveryToClient(request, deliveryData);
  return orderContext;
};

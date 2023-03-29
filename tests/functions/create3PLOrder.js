import { createPaidSberOrder } from "../functions/createOrder";
import { merchantOperations } from "../functions/merchantOperations";

import { delay } from "../functionsGeneral/delay";

const config = require("../config");

exports.create3PLOrder = async function (request, page, orderData) {
  const orderContext = await createPaidSberOrder(request, page, orderData);
  await delay(3000);
  const omsPublicAPIconfim =
    config.omsPublicAPI + orderContext.parcelNumber + "/confirm";
  const omsPublicAPIpack =
    config.omsPublicAPI + orderContext.parcelNumber + "/pack";
  const omsPublicAPIship =
    config.omsPublicAPI + orderContext.parcelNumber + "/ship";
  await merchantOperations(request, omsPublicAPIconfim);
  await delay(3000);
  await merchantOperations(request, omsPublicAPIpack);
  await delay(3000);
  await merchantOperations(request, omsPublicAPIship);
  return orderContext;
};

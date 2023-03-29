import { expect } from "@playwright/test";

import { delay } from "../functionsGeneral/delay";

const config = require("../config");

exports.deliveryToClient = async function (request, deliveryData) {
  await delay(3000);
  const response = await request.post(`${config.camundaURL}/message`, {
    headers: { Cookie: "INGRESSCOOKIE=1631269138.398.501.982868" },
    data: deliveryData,
  });
  expect(response.status()).toBe(200);
};

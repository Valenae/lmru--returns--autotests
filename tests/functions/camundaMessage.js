import { delay } from "../functionsGeneral/delay";
import { expect } from "@playwright/test";

const config = require("../config");

exports.camundaMessage = async function (request, camundaData) {
  await delay(5000);
  const response = await request.post(`${config.camundaURL}/message`, {
    headers: { Cookie: "INGRESSCOOKIE=1631269138.398.501.982868" },
    data: camundaData,
  });
  expect(response.status()).toBe(204);
};

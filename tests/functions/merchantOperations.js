import { expect } from "@playwright/test";
import { delay } from "../functionsGeneral/delay";

const config = require("../config");

exports.merchantOperations = async function (request, omsPublicAPI) {
  await delay(3000);
  let response = await request.post(omsPublicAPI, {
    headers: { "x-merchant-id": "18" },
  });
  expect(response.status()).toBe(200);
};

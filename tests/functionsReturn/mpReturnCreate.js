import { expect } from "@playwright/test";

const config = require("../config");

exports.mpReturnCreate = async function (request, mpReturnData) {
  const response = await request.post(
    `${config.returnsURL}/mp-client-returns-creator/api/v1/returns/clientReturnParcels`,
    { data: mpReturnData }
  );
  const responseBody = JSON.parse(await response.text());
  expect(response.status()).toBe(201);
  const returnId = responseBody.id;
  return returnId;
};

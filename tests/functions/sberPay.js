import { expect } from "@playwright/test";

import { delay } from "../functionsGeneral/delay";

const config = require("../config");
const sberPassword = require("../../passwords/sberPassword.json");

exports.sberPay = async function (request, page, paymentSberData) {
  const response = await request.post(`${config.paymentURL}`, {
    data: paymentSberData,
  });
  const responseBody = JSON.parse(await response.text());
  expect(response.status()).toBe(201);
  const sberURL = responseBody.url;

  await delay(5000);
  await page.goto(sberURL);
  await page.locator('[data-test-id="pan"]').fill(sberPassword.sberPass);
  await page.locator('[data-test-id="expiry"]').fill("12/24");
  await page.locator('[data-test-id="cvc"]').fill("123");
  await page.locator('[data-test-id="submit-payment"]').click();
  await delay(5000);
  await page.getByPlaceholder("********").fill(sberPassword.smsCode);
  await delay(5000);
  return sberURL;
};

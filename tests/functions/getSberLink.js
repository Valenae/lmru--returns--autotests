import{expect} from '@playwright/test'

const config = require("../config")

exports.getSberLink = async function (request, paymentSber){
      let response = await request.post(`${config.paymentURL}`, {data: paymentSber});
      let responseBody = JSON.parse(await response.text())
      expect(response.status()).toBe(201);
      const sberURL = responseBody.url
      return (sberURL)
    };
  
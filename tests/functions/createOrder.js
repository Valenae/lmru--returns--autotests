import{expect} from '@playwright/test'

const config = require("../config")
const CreateOrderNumbers = require("../createOrderNumbers");

exports.createOrder = async function (request, orderData){
      let response = await request.post(`${config.omsURL}/v2/orders`, {data: orderData});
      let responseBody = JSON.parse(await response.text())
      expect(response.status()).toBe(200);
      const orderNumber = responseBody.result.number;
      const parcelNumber = orderNumber + '-001';
      return new CreateOrderNumbers (orderNumber, parcelNumber)
    };
  
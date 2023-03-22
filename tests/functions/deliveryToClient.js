import{expect} from '@playwright/test'

const config = require("../config")

exports.paymentReceived = async function (request, delivertData){
      let response = await request.post(`${config.camundaURL}/message`, {headers: {'Cookie': 'INGRESSCOOKIE=1631269138.398.501.982868'}, data: delivertData});
      expect(response.status()).toBe(200);
    };
  
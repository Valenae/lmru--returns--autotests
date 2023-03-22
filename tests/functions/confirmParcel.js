import{expect} from '@playwright/test'
import {delay} from '../functions/delay'


const config = require("../config")

exports.confirmParcel = async function (request, omsPublicAPI){
      await delay(5000);
      console.log(omsPublicAPI)
      let response = await request.post(omsPublicAPI, {headers: {'x-merchant-id': '18'}});
      expect(response.status()).toBe(200);


    };
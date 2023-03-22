import{expect} from '@playwright/test'

const config = require("../config")

exports.mpReturnCreate = async function (request, mpReturnData){
      let response = await request.post(`${config.returnsURL}/mp-client-returns-creator/api/v1/returns/clientReturnParcels`, {data: mpReturnData});
      let responseBody = JSON.parse(await response.text())
      const returnId = responseBody.id;
      console.log(returnId)
      return returnId
    };
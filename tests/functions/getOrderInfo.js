const config = require("../config")
const CreateOrderIds = require("../CreateOrderIds");

exports.getOrderInfo = async function (request, pracelData){
      let response = await request.post(`${config.omsStorage}/v2/parcels:search`, {data: pracelData});
      let responseBody = JSON.parse(await response.text())
      const parcelId = responseBody.result[0].id;
      const orderId = responseBody.result[0].parent_id;
      return new CreateOrderIds (orderId, parcelId)
    };
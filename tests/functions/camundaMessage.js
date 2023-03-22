const config = require("../config")

exports.camundaMessage = async function (request, camundaData){
      let response = await request.post(`${config.camundaURL}/message`, {headers: {'Cookie': 'INGRESSCOOKIE=1631269138.398.501.982868'}, data: camundaData});
    };
  
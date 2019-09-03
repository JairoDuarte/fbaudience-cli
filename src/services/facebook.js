'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
const CustomAudience = bizSdk.CustomAudience;
const Env = require('../../env.json');

const access_token = process.env.ACCESS_TOKEN || Env.ACCESS_TOKEN;
const id = process.env.AD_ACCOUNT_ID || Env.AD_ACCOUNT_ID;

const urlAudience = `v4.0/act_${id}/customaudiences`;

const api = bizSdk.FacebookAdsApi.init(access_token);
const showDebugingInfo = true;
if (showDebugingInfo) {
  api.setDebug(true);
}

async function getAudiences(api) {
  const url = `${urlAudience}?access_token=${access_token}&fields=id,name`;
  const response = await api.get(url);
  if (response.error) {
    const {
      error: { message, type }
    } = response;
    return { message, type };
  } else return response.data;
}

module.exports.getAudiences = getAudiences;
module.exports.addAudience = async (audience = {}, api) => {
  let fields, body;
  fields = [];
  body = {
    ...audience,
    subtype: 'CUSTOM',
    customer_file_source: 'USER_PROVIDED_ONLY',
    access_token
  };
  const response = await api.post(urlAudience, body);

  return response;
};

module.exports.addUsers = (users = [], audienceId, api) => {
  const urlUser = `v2.11/${audienceId}/users`;

  const logApiCallResult = (apiCallName, data) => {
    console.log(apiCallName);
    if (showDebugingInfo) {
      console.log('Data:' + JSON.stringify(data));
    }
  };

  let fields, params;
  fields = [];
  params = {
    payload: {
      schema: ['EMAIL'],
      data: [...users]
    }
  };
  // const usersResponse = new CustomAudience(audienceId).createUser(fields, params);
  // logApiCallResult('users api call complete.', usersResponse);
};

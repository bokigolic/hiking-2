import config from "./config";


export const urlLib = {};

urlLib.urlPrefix = () => {
  // return 'http://localhost:3001';
  return 'http://localhost:' + config.BACKEND_PORT;
};

urlLib.apiGraphQL = () => {
  // 'http://localhost:3001/api/v2/graphql'
  // return 'http://localhost:3001/api/v2/graphql'; // 'http://localhost:3001/api/v2/graphql'
  return urlLib.urlPrefix() + '/api/v2/graphql'; // 'http://localhost:3001/api/v2/graphql'
};

urlLib.primerNekiDrugiApi = () => {
  return urlLib.urlPrefix() + '/api/v1/revies/all/get';
};

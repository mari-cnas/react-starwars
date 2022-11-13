import axios from 'axios';

import Config from 'Config';

const cepApi = axios.create({
  baseURL: Config.cepApi.baseURL,
});

export default cepApi;

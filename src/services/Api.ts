import axios from 'axios';

import Config from 'Config';

const Api = axios.create({
  baseURL: Config.api.baseURL,
});

export default Api;

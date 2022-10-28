const Config = {
  app: {
    name: import.meta.env.VITE_APP_NAME,
    version: import.meta.env.PACKAGE_VERSION,
  },
  i18n: {
    debbug: JSON.parse(
      (import.meta.env.VITE_I18N_DEBBUG ?? 'false').toLocaleLowerCase(),
      // Converts 'true' to true and 'false' to false
    ),
  },
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL,
  },
  cepApi: {
    baseURL: import.meta.env.VITE_CEPAPI_BASE_URL,
  },
};

export default Config;
// baseURL: import.meta.env.VITE_CEPAPI_BASE_URL ?? '',

import UmbracoClient from './UmbracoClient.ts';

const createClient = (baseUrl: string, { version = 'v2' } = {}) => {
  return new UmbracoClient({ baseUrl, version });
};

export default createClient;

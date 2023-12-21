import axios from 'axios';

import { reportError } from './rollbar';

const { /* THIRDPARTY_API_TOKEN, THIRDPARTY_API_ENDPOINT, */ VERBOSE } = process.env;

const isVerbose = VERBOSE === 'true';

// if (!THIRDPARTY_API_TOKEN) {
//   throw new Error('Missing THIRDPARTY_API_TOKEN environment variable');
// }

// if (!THIRDPARTY_API_ENDPOINT) {
//   throw new Error('Missing THIRDPARTY_API_ENDPOINT environment variable');
// }

// const encodedApiToken = Buffer.from(`${THIRDPARTY_API_TOKEN}:X`).toString('base64');

// export const axiosInstance = axios.create({
//   baseURL: THIRDPARTY_API_ENDPOINT,
// });
// axiosInstance.defaults.headers.common.Authorization = `Basic ${encodedApiToken}`;

const obfuscateAuthorizationHeaders = (key: string, value: any): string => {
  if (key === 'Authorization') {
    return 'Basic ***';
  }
  return value;
};

axios.interceptors.request.use(
  (request) => {
    if (isVerbose) {
      console.log('📤 Request sent', JSON.stringify(request, obfuscateAuthorizationHeaders, 2));
    }
    return request;
  },
  (error) => {
    reportError('Error in Axios request', error);
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(
  (response) => {
    if (isVerbose) {
      console.log('📥 Response received', JSON.stringify(response.data, obfuscateAuthorizationHeaders, 2));
    }
    return response;
  },
  (error) => {
    reportError('Error in Axios response', error);
    return Promise.reject(error);
  },
);

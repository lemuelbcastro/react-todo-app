import axios from 'axios';

import {
  success as requestSuccessHandler,
  error as requestErrorHandler,
} from './requestHandler';
import {
  success as responseSuccessHandler,
  error as responseErrorHandler,
} from './responseHandler';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

instance.interceptors.request.use(requestSuccessHandler, requestErrorHandler);
instance.interceptors.response.use(
  responseSuccessHandler,
  responseErrorHandler
);

export default instance;

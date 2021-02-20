import axios from './axios';
import {
  success as requestSuccessHandler,
  error as requestErrorHandler,
} from './requestHandler';
import {
  success as responseSuccessHandler,
  error as responseErrorHandler,
} from './responseHandler';

let requestInterceptor;
let responseInterceptor;

const interceptor = {
  register: () => {
    requestInterceptor = axios.interceptors.request.use(
      requestSuccessHandler,
      requestErrorHandler
    );
    responseInterceptor = axios.interceptors.response.use(
      responseSuccessHandler,
      responseErrorHandler
    );
  },
  unregister: () => {
    axios.interceptors.request.eject(requestInterceptor);
    axios.interceptors.request.eject(responseInterceptor);
  },
};

export default interceptor;

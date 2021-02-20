import history from './history';
import snackbarHelper from './snackbarHelper';
import store from '../app/store';

const handler = {
  success: (response) => response,
  error: (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 400:
          snackbarHelper.error('The server could not process your request');
          break;
        case 401:
          store.dispatch({ type: 'authentication/logout' });
          break;
        case 403:
          history.push('/forbidden');
          break;
        case 404:
          history.push('/not-found');
          break;
        case 422:
          const { errors } = response.data;

          Object.entries(errors).forEach(([, value]) =>
            snackbarHelper.error(value)
          );
          break;
        case 500:
          history.push('/server-error');
          break;
        default:
      }
    }

    return Promise.reject(error);
  },
};

export const { success, error } = handler;

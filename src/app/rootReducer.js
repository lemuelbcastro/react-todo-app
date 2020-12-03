import { combineReducers } from 'redux';
import authenticationReducer from '../features/Authentication/authenticationSlice';
import spinnerReducer from '../features/Spinner/spinnerSlice';

export default combineReducers({
  authentication: authenticationReducer,
  spinner: spinnerReducer,
});

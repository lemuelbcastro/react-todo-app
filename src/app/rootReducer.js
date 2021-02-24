import { combineReducers } from 'redux';
import authenticationReducer from '../features/Authentication/authenticationSlice';
import spinnerReducer from '../features/Spinner/spinnerSlice';
import todosReducer from '../features/Todos/todosSlice';
import usersReducer from '../features/Users/usersSlice';

export default combineReducers({
  authentication: authenticationReducer,
  spinner: spinnerReducer,
  todos: todosReducer,
  users: usersReducer,
});

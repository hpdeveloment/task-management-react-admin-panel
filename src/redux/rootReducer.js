import { combineReducers } from 'redux';
import doDoListReducer from './reducers';

const rootReducer = combineReducers({
  toDoList: doDoListReducer,
});

export default rootReducer;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Staffs } from './staffs';
import { Departments } from './departments';
import { StaffsInDept } from './staffsInDept';
import { Salary } from './salary';

export const Store = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      dept: Departments,
      salary: Salary,
      staffsInDept: StaffsInDept,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, logger)
  );
  return store;
};

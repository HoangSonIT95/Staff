import * as ActionTypes from './ActionTypes';

export const Departments = (
  state = { isLoading: true, errMess: null, dept: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.DEPTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dept: action.payload,
      };

    case ActionTypes.DEPTS_LOADING:
      return { ...state, isLoading: true, errMess: null, dept: [] };

    case ActionTypes.DEPTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};

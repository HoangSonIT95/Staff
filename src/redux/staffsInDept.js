import * as ActionTypes from './ActionTypes';

export const StaffsInDept = (
  state = { isLoading: true, errMess: null, staffsInDept: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.STAFFS_DEPT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffsInDept: action.payload,
      };

    case ActionTypes.STAFFS_DEPT_LOADING:
      return { ...state, isLoading: true, errMess: null, staffsInDept: [] };

    case ActionTypes.STAFFS_DEPT_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};

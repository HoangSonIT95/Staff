import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// lấy staffs từ api
export const fetchStaffs = () => dispatch => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + 'staffs')
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' +
              response.status +
              ': ' +
              response.statusText +
              '. Please try again later'
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message + '. Please try again later');
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(staffs => dispatch(staffsSuccess(staffs)))
    .catch(error => dispatch(staffsFailed(error.message)));
};

// loading nhân viên
export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});
// báo lỗi fetch api
export const staffsFailed = errmess => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});
// fetch api thành công
export const staffsSuccess = staffs => ({
  type: ActionTypes.STAFFS,
  payload: staffs,
});
// thêm nhân viên
export const addStaff = staffs => ({
  type: ActionTypes.ADD_STAFF,
  payload: staffs,
});

export const postStaff = staff => dispatch => {
  const newStaff = staff;
  return fetch(baseUrl + 'staffs', {
    method: 'POST',
    body: JSON.stringify(newStaff),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(addStaff(response)))
    .catch(error => {
      console.log('add staff', error.message);
      alert('new staff could not be add\nError: ' + error.message);
    });
};

// cap nhat thong tin nhan vien
export const updateStaffSuccess = staffs => ({
  type: ActionTypes.UPDATE_STAFF,
  payload: staffs,
});

export const updateStaff = staff => dispatch => {
  return fetch(baseUrl + 'staffs', {
    method: 'PATCH',
    body: JSON.stringify(staff),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message + '. Please try again later');
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(updateStaffSuccess(response)))
    .catch(error => {
      console.log('update staff', error.message);
      alert('staff could not be updated\nError: ' + error.message);
    });
};
// xoá nhân viên
export const deleteStaffSuccess = staffs => ({
  type: ActionTypes.DELETE_STAFF,
  payload: staffs,
});

export const deleteStaff = id => dispatch => {
  if (window.confirm('Are you sure you want to delete this staff?')) {
    return fetch(baseUrl + `staffs/${id}`, {
      method: 'DELETE',
    })
      .then(
        response => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              'Error ' + response.status + ': ' + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        error => {
          var errmess = new Error(error.message + '. Please try again later');
          throw errmess;
        }
      )
      .then(response => response.json())
      .then(response => dispatch(deleteStaffSuccess(response)))
      .catch(error => {
        console.log('delete staff', error.message);
        alert('staff could not be deleted\nError: ' + error.message);
      });
  } else return;
};

// lấy dữ liệu phòng ban từ api
export const fetchDept = () => dispatch => {
  dispatch(deptLoading(true));

  return fetch(baseUrl + 'departments')
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' +
              response.status +
              ': ' +
              response.statusText +
              '. Please try again later'
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message + '. Please try again later');
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(dept => dispatch(deptSuccess(dept)))
    .catch(error => dispatch(deptFailed(error.message)));
};

export const deptLoading = () => ({
  type: ActionTypes.DEPTS_LOADING,
});

export const deptFailed = errmess => ({
  type: ActionTypes.DEPTS_FAILED,
  payload: errmess,
});

export const deptSuccess = dept => ({
  type: ActionTypes.DEPTS,
  payload: dept,
});

// lấy dữ liệu lương từ api
export const fetchSalary = () => dispatch => {
  dispatch(salaryLoading(true));

  return fetch(baseUrl + 'staffsSalary')
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' +
              response.status +
              ': ' +
              response.statusText +
              '. Please try again later'
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message + '. Please try again later');
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(salary => dispatch(salarySuccess(salary)))
    .catch(error => dispatch(salaryFailed(error.message)));
};

export const salaryLoading = () => ({
  type: ActionTypes.SALARY_LOADING,
});

export const salaryFailed = errmess => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errmess,
});

export const salarySuccess = salary => ({
  type: ActionTypes.SALARY,
  payload: salary,
});

// fetch staffs in department
export const fetchStaffInDept = deptId => dispatch => {
  dispatch(staffsDeptLoading(true));

  return fetch(baseUrl + `departments/${deptId}`)
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' +
              response.status +
              ': ' +
              response.statusText +
              '. Please try again later'
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message + '. Please try again later');
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(staffsInDept => dispatch(staffsInDeptSuccess(staffsInDept)))
    .catch(error => dispatch(staffsDeptFailed(error.message)));
};

export const staffsDeptLoading = () => ({
  type: ActionTypes.STAFFS_DEPT_LOADING,
});

export const staffsDeptFailed = errmess => ({
  type: ActionTypes.STAFFS_DEPT_FAILED,
  payload: errmess,
});

export const staffsInDeptSuccess = staffsInDept => ({
  type: ActionTypes.STAFFS_DEPT,
  payload: staffsInDept,
});

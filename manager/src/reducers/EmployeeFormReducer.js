import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_DELETE_SUCCESS,
} from '../actions/types';

const initialState = {
  name: '',
  phone: '',
  shift: 'Monday',
  uid: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case EMPLOYEE_UPDATE:
      return {...state, [payload.prop]: payload.value};

    case EMPLOYEE_CREATE:
      return initialState;
    case EMPLOYEE_SAVE_SUCCESS:
      return initialState;
    case EMPLOYEE_DELETE_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

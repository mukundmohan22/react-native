import {EMPLOYEE_FECTCH_SUCCESS} from '../actions/types';

const initialState = [];

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case EMPLOYEE_FECTCH_SUCCESS:
      return payload;
    default:
      return state;
  }
};

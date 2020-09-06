import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
} from '../actions/types';

const initialState = {
  email: '',
  password: '',
  loading: false,
  error: '',
  user: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case EMAIL_CHANGED:
      return {...state, email: payload};
    case PASSWORD_CHANGED:
      return {...state, password: payload};
    case LOGIN_USER:
      return {...state, loading: true, error: ''};
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...initialState,
        user: payload,
      };
    case LOGIN_USER_FAIL:
      return {...state, user: null, error: payload, loading: false};

    default:
      return state;
  }
};

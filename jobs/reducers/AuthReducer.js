import { FB_LOGIN_SUCCESS, FB_LOGIN_FAIL,FB_LOGIN } from "../actions/types";
const initialState = {
  user: null,
  token: null,
  errorMsg: "",
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FB_LOGIN:
      return { ...state, isLoading: true, errorMsg: "" };
    case FB_LOGIN_SUCCESS:
      return { ...state, token: payload, isLoading: false, errorMsg: "" };
    case FB_LOGIN_FAIL:
      return {
        ...state,
        token: null,
        errorMsg: "Authentication failed.",
        isLoading: false,
      };
    default:
      return state;
  }
};

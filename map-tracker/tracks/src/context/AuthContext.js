import createDataContext from "./createDataContext";
import trackerAPi from "../api/tracker";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";

export const actionType = {
  SINGIN: "SINGIN",
  SIGNOUT: "SIGNOUT",
  ADD_ERROR: "ADD_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case actionType.SINGIN:
      return { token: action.payload, errorMessage: "" };

    case actionType.SIGNOUT:
      return { token: null, errorMessage: "" };

    case actionType.ADD_ERROR:
      return { ...state, errorMessage: action.payload };

    case actionType.CLEAR_ERROR:
      return { ...state, errorMessage: "" };

    default:
      return state;
  }
};

const tryLocalSignin = (disptach) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    disptach({ type: actionType.SINGIN, payload: token });
    navigate("TrackList");
  } else {
    navigate("loginFlow");
  }
};

const clearErrorMessage = (disptach) => () => {
  disptach({ type: actionType.CLEAR_ERROR });
};

const signup = (disptach) => async ({ email, password }) => {
  try {
    const response = await trackerAPi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    disptach({
      type: actionType.SINGIN,
      payload: response.data.token,
    });
    navigate("TrackList");
  } catch (error) {
    disptach({
      type: actionType.ADD_ERROR,
      payload: "Something went wrong with sign up",
    });
  }
};

const signin = (disptach) => async ({ email, password }) => {
  try {
    const response = await trackerAPi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    disptach({
      type: actionType.SINGIN,
      payload: response.data.token,
    });
    navigate("TrackList");
  } catch (error) {
    disptach({
      type: actionType.ADD_ERROR,
      payload: "Something went wrong with sign in",
    });
  }
};

const signout = (disptach) => async () => {
  await AsyncStorage.removeItem("token");
  disptach({ type: actionType.SIGNOUT });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);

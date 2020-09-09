import { AsyncStorage } from "react-native";
import { FB_LOGIN_SUCCESS, FB_LOGIN_FAIL, FB_LOGIN } from "./types";
import * as Facebook from "expo-facebook";

export const facebookLogin = () => async (dispatch) => {
  dispatch({ type: FB_LOGIN });
  const token = await AsyncStorage.getItem("fb_token");
  if (token) {
    dispatch({
      type: FB_LOGIN_SUCCESS,
      payload: token,
    });
  } else {
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async (dispatch) => {
  await Facebook.initializeAsync("969443836904617");
  let { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ["public_profile"],
  });

  if (type === "cancel") {
    return dispatch({ type: FB_LOGIN_FAIL });
  }
  await AsyncStorage.setItem("fb_token", token);
  dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
};

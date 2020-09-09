import React, { useEffect } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { facebookLogin } from "../actions/authActions";
import { Button } from "react-native-elements";

const AuthScreen = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      navigation.navigate("Map");
    }
  }, [auth.token]);

  useEffect(() => {
    dispatch(facebookLogin());
  }, []);

  return <SafeAreaView />;
};

export default AuthScreen;

const styles = StyleSheet.create({});

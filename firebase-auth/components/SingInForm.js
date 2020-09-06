import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import axios from "axios";
import firebase from "firebase";

const ROOT_URL = "http://localhost:5001/one-time-password-904d2/us-central1";
const SignInForm = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    console.log("Calling verfiy One time ");
    try {
      const { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
        phone,
        code,
      });
      console.log("token ", data);
      let res = await firebase.auth().signInWithCustomToken(data.token);
      console.log("firebase Res ", res);
    } catch (error) {
      console.log("Error ", error);
    }
  };
  return (
    <View style={{ padding: 20 }}>
      <Input
        label="Enter Phone Number"
        value={phone}
        keyboardType="number-pad"
        onChangeText={setPhone}
      ></Input>
      <Input
        label="Enter code"
        value={code}
        keyboardType="number-pad"
        onChangeText={setCode}
      ></Input>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    color: "white",
  },
});

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Header, Text } from "react-native-elements";
import axios from "axios";

const ROOT_URL = "http://localhost:5001/one-time-password-904d2/us-central1";
const signUpForm = () => {
  const [phone, setPhone] = useState("");

  const handleSubmit = async () => {
    try {
      const r1 = await axios.post(`${ROOT_URL}/createUser`, { phone });
      console.log("r1", r1);
      const r2 = await axios.post(`${ROOT_URL}/requestOneTimePassword`, {
        phone,
      });
      console.log("r2", r2);
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
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default signUpForm;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    color: "white",
  },
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import { clearLikedJobs } from "../actions/jobActions";

const SettingScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={{ marginTop: 30, padding: 20 }}>
      <Button
        buttonStyle={{ backgroundColor: "#f44336", padding: 20 }}
        title="Clear Liked Jobs"
        icon={{ name: "delete-forever", color: "white" }}
        onPress={() => dispatch(clearLikedJobs())}
      />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});

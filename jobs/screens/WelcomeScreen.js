import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Slides from "../components/Slides";
import { AppLoading } from "expo";
import { isNull } from "lodash";

const SLIDE_DATA = [
  { text: "Welcome to Job App, Swipe right to get started", color: "#03A9F4" },
  { text: "Use this App to get Job locally..", color: "#009688" },
  { text: "Set your location, then swipe away", color: "#03A9F4" },
];

const WelcomeScreen = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(null);
  const onSlideComplete = () => {
    navigation.navigate("auth");
  };
  useEffect(() => {
    const checkToken = async () => {
      let token = await AsyncStorage.getItem("fb_token");
      if (token) {
        navigation.navigate("Map");
      } else {
        setisLoading(false);
      }
    };
    checkToken();
  }, []);

  if (isNull(isLoading)) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slides data={SLIDE_DATA} onComplete={onSlideComplete} />
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});

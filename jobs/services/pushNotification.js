import { AsyncStorage } from "react-native";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import axios from "axios";
import Constants from "expo-constants";

const PUSH_ENDPOINT = "http://rallycoding.herokuapp.com/api/tokens";
export default async () => {
  let perviousToken = await AsyncStorage.getItem("pushtoken");
  if (perviousToken) {
    return;
  } else {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    try {
      let res = await axios.post(PUSH_ENDPOINT, {
        token: { token },
      });
    } catch (error) {
      console.log("Error ", error);
    }

    console.log("res", res);
    await AsyncStorage.setItem("pushtoken", token);
  }
};

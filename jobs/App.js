import React, { useEffect, useRef } from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthScreen from "./screens/AuthScreen";
import DeckScreen from "./screens/DeckScreen";
import ReviewScreen from "./screens/ReviewScreen";
import SettingScreen from "./screens/SettingScreen";
import MapScreen from "./screens/MapScreen";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { PersistGate } from "redux-persist/integration/react";
import registerForNotifications from "./services/pushNotification";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

const reviewFlow = createStackNavigator({
  review: ReviewScreen,
  setting: SettingScreen,
});

reviewFlow.navigationOptions = {
  title: "Review Jobs",
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name="ios-save" size={24} color={tintColor} />
  ),
};

const mainFlow = createBottomTabNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarLabel: "Map",
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="my-location" size={24} color={tintColor} />
        ),
      },
    },
    Deck: {
      screen: DeckScreen,
      navigationOptions: {
        tabBarLabel: "Jobs",
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="description" size={24} color={tintColor} />
        ),
      },
    },
    reviewFlow,
  },
  {
    tabBarOptions: {
      labelStyle: { fontSize: 12 },
    },
  }
);

const switchNavigator = createSwitchNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen,
  main: mainFlow,
});

const App = createAppContainer(switchNavigator);

export default () => {
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForNotifications();

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {

        if (notification.request.content.body) {
          Alert.alert(
            notification.request.content.title,
            notification.request.content.body,
            [{ text: "Ok" }]
          );
        }
      }
    );
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

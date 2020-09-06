import React, { useContext, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Map from "../components/Map";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import { FontAwesome } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);
  const callBack = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );
  const [err] = useLocation(isFocused || recording, callBack);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2 style={{ alignSelf: "center" }}>
        Create a Track
      </Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};
TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name="plus" size={20} color="black" />,
};

export default withNavigationFocus(TrackCreateScreen);

const styles = StyleSheet.create({});

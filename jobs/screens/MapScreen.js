import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../actions/jobActions";
import { Button } from "react-native-elements";
const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.job);

  const [region, setRegion] = useState({
    longitude: -122,
    latitude: 37,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09,
  });

  const onRegaionChangeComplete = (r) => {
    setRegion(r);
  };
  const onButtonPress = () => {
    dispatch(fetchJobs(region, () => navigation.navigate("Deck")));
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={region}
        onRegionChangeComplete={onRegaionChangeComplete}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={{ padding: 15, backgroundColor: "#009688" }}
          titleStyle={{ fontSize: 25 }}
          icon={{ name: "search", color: "white", size: 30 }}
          title="Search this area"
          loading={isLoading}
          onPress={onButtonPress}
        />
      </View>
    </SafeAreaView>
  );
};

MapScreen.navigationOptions = () => {};
export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    fontSize: 25,
    bottom: 20,
    left: 10,
    right: 10,
  },
  mapStyle: {
    flex: 1,
  },
});

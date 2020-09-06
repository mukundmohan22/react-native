import React, { useContext } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }
  return (
    <MapView
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      style={styles.map}
    >
      <Circle
        center={currentLocation.coords}
        radius={25}
        strokeColor="rgba(158,158,255,1.0)"
        fillColor="rgba(158,158,255,.4)"
      />
      <Polyline coordinates={locations.map((loc) => loc.coords)} />
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    height: "60%",
    padding: 10,
  },
});

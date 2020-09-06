import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as TrackContext } from "../context/TracksContext";
import MapView, { Polyline } from "react-native-maps";

const TrackDetailScreen = ({ navigation }) => {
  const _id = navigation.getParam("_id");

  const { state } = useContext(TrackContext);
  const track = state.find((t) => t._id === _id);
  const initialCoords = track.locations[0].coords;
  return (
    <View>
      <Text>{track.name}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          ...initialCoords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    </View>
  );
};

export default TrackDetailScreen;

const styles = StyleSheet.create({
  map: {
    height: "60%",
    padding: 10,
  },
});

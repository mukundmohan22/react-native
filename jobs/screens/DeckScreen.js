import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Swipe from "../components/Swipe";
import { Card, Button } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import { likeJob } from "../actions/jobActions";

const DeckScreen = ({ navigation }) => {
  const jobs = useSelector((state) => state.job.results);
  const dispatch = useDispatch();

  const renderCard = (job) => {
    const initalRegion = {
      latitude: job.latitude,
      longitude: job.longitude,
      longitudeDelta: 0.02,
      latitudeDelta: 0.045,
    };
    return (
      <Card
        key={job.jobkey}
        containerStyle={{ height: Dimensions.get("window").height - 250 }}
      >
        <Card.Title>{job.jobtitle}</Card.Title>
        <View style={{ height: Dimensions.get("window").height - 450 }}>
          <MapView
            cacheEnabled={Platform.OS === "android"}
            scrollEnabled={false}
            style={{ flex: 1 }}
            initialRegion={initalRegion}
          >
            <Marker coordinate={initalRegion} />
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>{job.snippet.replace(/<b>/g, "").replace(/<\/b>/g, "")}</Text>
      </Card>
    );
  };
  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>No More jobs</Card.Title>
        <Button
          title="Go Back to Map"
          onPress={() => navigation.navigate("Map")}
          buttonStyle={{ backgroundColor: "#03a9f4" }}
          icon={{ name: "my-location", color: "white" }}
        />
      </Card>
    );
  };

  return (
    <SafeAreaView>
      <Swipe
        data={jobs}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        onSwipeRight={(job) => dispatch(likeJob(job))}
        keyProp="jobkey"
        activeCard={0}
      />
    </SafeAreaView>
  );
};

export default DeckScreen;

const styles = StyleSheet.create({
  detailWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

import React from "react";
import { StyleSheet, Text, ScrollView, View, Linking } from "react-native";
import { Button, Card } from "react-native-elements";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

const ReviewScreen = ({ navigation }) => {
  const likedJobs = useSelector((state) => state.likedJobs);

  const renderLikedJobs = () => {
    return likedJobs.map((job) => {
      const initalRegion = {
        latitude: job.latitude,
        longitude: job.longitude,
        longitudeDelta: 0.02,
        latitudeDelta: 0.045,
      };
      return (
        <Card key={job.jobkey}>
          <Card.Title>{job.jobtitle}</Card.Title>
          <View style={{ height: 220 }}>
            <MapView
              cacheEnabled={Platform.OS === "android"}
              scrollEnabled={false}
              style={{ flex: 1 }}
              initialRegion={initalRegion}
            >
              <Marker coordinate={initalRegion} />
            </MapView>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{job.company}</Text>
              <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now"
              onPress={() => Linking.openURL(job.url)}
            />
          </View>
        </Card>
      );
    });
  };

  return <ScrollView>{renderLikedJobs()}</ScrollView>;
};
ReviewScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Review Jobs",
    headerRight: () => (
      <Button
        title="Setting"
        type="clear"
        onPress={() => navigation.navigate("setting")}
      />
    ),
  };
};
export default ReviewScreen;

const styles = StyleSheet.create({
  detailWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  italics: {
    fontStyle: "italic",
  },
});

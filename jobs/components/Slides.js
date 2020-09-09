import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Button } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Slides = (props) => {
  const renderSlides = () => {
    const length = props.data?.length - 1;
    return props.data.map((slide, index) => {
      return (
        <View
          style={[styles.slideStyle, { backgroundColor: slide.color }]}
          key={index}
        >
          <Text style={styles.slideText}>{slide.text}</Text>
          {length === index ? (
            <Button
              buttonStyle={styles.buttonStyle}
              title="Let's go"
              onPress={props.onComplete}
            />
          ) : null}
        </View>
      );
    });
  };

  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
    >
      {renderSlides()}
    </ScrollView>
  );
};

export default Slides;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 70,
    borderRadius: 20,
  },
  slideStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH - 40,
  },
  slideText: {
    fontSize: 30,
    color: "white",
    padding: 10,
    textAlign: "center",
  },
  buttonStyle: {
    marginTop: 15,
    backgroundColor: "#0288D1",
  },
});

import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";

const Ball = () => {
  const position = useRef(new Animated.ValueXY(0, 0)).current;
  useEffect(() => {}, []);
  const tabToStart = () => {
    Animated.spring(position, {
      toValue: { x: 300, y: 500 },
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View style={position.getLayout()}>
      <TouchableOpacity onPress={tabToStart}>
        <View style={styles.ball}></View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Ball;

const styles = StyleSheet.create({
  ball: {
    borderRadius: 30,
    height: 60,
    width: 60,
    borderWidth: 30,
    borderColor: "black",
  },
});

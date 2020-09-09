import React, { useRef, useState, useMemo, useEffect } from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Swipe = (props) => {
  const [activeCard, setActiveCard] = useState(props.activeCard);
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    setActiveCard(0);
  }, [props.data]);

  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  LayoutAnimation.spring();

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          position.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dx > SWIPE_THRESHOLD) {
            forceSwipe("right");
          } else if (gestureState.dx < -SWIPE_THRESHOLD) {
            forceSwipe("left");
          } else {
            resetPosition();
          }
        },
      }),
    [activeCard]
  );

  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };
  const onSwipeComplete = (direction) => {
    const { onSwipeLeft, onSwipeRight, data } = props;
    const item = data[activeCard];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setActiveCard(activeCard + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    const opacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1, 0, SCREEN_WIDTH * 1],
      outputRange: [0, 1, 0],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
      opacity,
    };
  };

  const renderCards = () => {
    if (activeCard >= props.data.length) {
      return props.renderNoMoreCards();
    }
    const deck = props.data.map((item, index) => {
      if (index < activeCard) {
        return null;
      }
      if (index === activeCard) {
        return (
          <Animated.View
            key={item[props.keyProp]}
            style={[getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
            {...panResponder.panHandlers}
          >
            {props.renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <Animated.View
          key={item[props.keyProp]}
          style={[
            styles.cardStyle,
            { top: 10 * (index - activeCard), zIndex: -index },
          ]}
        >
          {props.renderCard(item)}
        </Animated.View>
      );
    });

    return deck;
  };

  return <View>{renderCards()}</View>;
};

Swipe.defaultProps = {
  onSwipeRight: () => {},
  onSwipeLeft: () => {},
  keyProp: "id",
};
export default Swipe;

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});

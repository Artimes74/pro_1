import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function BottomSheetScanDevices() {
  const top = useSharedValue(height);
  const dispatch = useDispatch();

  const animatationStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, {
        damping: 80,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
        stiffness: 500,
      }),
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value;
    },
    onActive(event, context) {
      top.value = context.startTop + event.translationY;
    },
    onEnd() {
      if (top.value > height / 2 + 200) {
        top.value = height;
      } else {
        top.value = height / 2;
      }
    },
  });
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.BottomSheetiStyle, animatationStyle]} />
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  BottomSheetiStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "rgba(250,250,250,1)",
  },
});

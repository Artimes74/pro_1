import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  TextInput,
} from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import TypeOfScenario from "../../components/createScenario/TypeOfScenario";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

import Arrow from "../../components/icons/Arrow";
import Add from "../../components/icons/Add";

export default function CreateScenarios() {
  const { platform, scenarioType } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <View style={styles.Container}>
      <MobilePlatform
        platform={platform}
        dispatch={dispatch}
        scenarioType={scenarioType}
      />
    </View>
  );
}

const MobilePlatform = ({ platform, dispatch, scenarioType }) => {
  if (platform === "ios") {
    return <IOS dispatch={dispatch} scenarioType={scenarioType} />;
  } else if (platform === "android") {
    return <Android />;
  } else {
    return <View />;
  }
};

const IOS = ({ dispatch, scenarioType }) => {
  return (
    <SafeAreaView style={styles.IOS}>
      <AllViewsContainer_IOS dispatch={dispatch} scenarioType={scenarioType} />
    </SafeAreaView>
  );
};

const Android = ({ dispatch }) => {
  return (
    <View style={styles.Android}>
      <Text>android</Text>
    </View>
  );
};

const AllViewsContainer_IOS = ({ dispatch, scenarioType }) => {
  const top = useSharedValue(height);

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
    <View style={styles.AllViewsContainer_IOS}>
      <View style={styles.TitleContainer}>
        <Text style={styles.Title}>CrateScenario</Text>
      </View>
      <View style={styles.TimerOrTitleContainer}>
        <TypeOfScenario />
      </View>
      <View style={styles.ScenarioItems}>
        <ActionScenarios scenarioType={scenarioType} topVal={top} />
      </View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.BottomSheetiStyle, animatationStyle]} />
      </PanGestureHandler>
    </View>
  );
};

const ActionScenarios = ({ scenarioType, topVal }) => {
  if (scenarioType == "Timer") {
    return (
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.TextInputContainer}>
          <TextInput style={styles.TextInput} placeholder={"Action name"} />
        </View>
        <View style={styles.TimerAndReapeat}>
          <View style={styles.BoxTimerAndRepeat}>
            <View style={styles.RepeatContainer}>
              <View style={styles.RepeatTextContainer}>
                <Text style={styles.RepeatText}>Repeat</Text>
              </View>
              <View style={styles.ArrowContainer}>
                <Arrow
                  width={"80%"}
                  height={"50%"}
                  color={"rgba(21,21,21,1)"}
                  rotate={"270deg"}
                />
              </View>
            </View>
            <View style={styles.Line} />
            <View style={styles.TimerContainer}>
              <View style={styles.TimerTextContainer}>
                <Text style={styles.TimerText}>Timer</Text>
              </View>
              <View style={styles.ArrowContainer}>
                <Arrow
                  width={"60%"}
                  height={"50%"}
                  color={"rgba(21,21,21,1)"}
                  rotate={"270deg"}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.DevicesAddContainer_Timer}>
          <View style={styles.ActionTextAndButtonContainer}>
            <View style={styles.ActionTextContainer}>
              <Text style={styles.ActionsText}>Actions</Text>
            </View>
            <View style={styles.AddActionButtonContainer}>
              <TouchableOpacity
                style={styles.AddActionButton}
                onPress={() => {
                  topVal.value = withSpring(height / 2, {
                    damping: 80,
                    overshootClamping: true,
                    restDisplacementThreshold: 0.1,
                    restSpeedThreshold: 0.1,
                    stiffness: 500,
                  });
                }}
              >
                <Add width={"60%"} height={"60%"} color={"rgba(21,21,21,1)"} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.Devices}></View>
        </View>
      </View>
    );
  } else if (scenarioType == "Manually") {
    return (
      <View style={StyleSheet.absoluteFill}>
        <View style={StyleSheet.absoluteFill}>
          <View style={styles.TextInputContainer}>
            <TextInput style={styles.TextInput} placeholder={"Action name"} />
          </View>

          <View style={styles.DevicesAddContainer_Manually}>
            <View style={styles.ActionTextAndButtonContainer}>
              <View style={styles.ActionTextContainer}>
                <Text style={styles.ActionsText}>Actions</Text>
              </View>
              <View style={styles.AddActionButtonContainer}>
                <TouchableOpacity style={styles.AddActionButton}>
                  <Add
                    width={"60%"}
                    height={"60%"}
                    color={"rgba(21,21,21,1)"}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.Devices}></View>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  IOS: {
    flex: 1,
  },
  Android: {
    flex: 1,
  },
  AllViewsContainer_IOS: {
    flex: 1,
  },
  TitleContainer: {
    width: "100%",
    height: "8%",
    justifyContent: "center",
  },
  TimerOrTitleContainer: {
    width: "100%",
    height: "10%",
  },
  ScenarioItems: {
    width: "100%",
    height: "82%",
  },
  Title: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    paddingLeft: 20,
  },
  TextInputContainer: {
    width: "100%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  TimerAndReapeat: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  DevicesAddContainer_Timer: {
    width: "100%",
    height: "55%",
  },
  DevicesAddContainer_Manually: {
    width: "100%",
    height: "85%",
  },
  TextInput: {
    width: "95%",
    height: "85%",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    paddingLeft: 20,
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  },
  BoxTimerAndRepeat: {
    width: "95%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  RepeatContainer: {
    width: "100%",
    height: "49.5%",
    justifyContent: "center",
    flexDirection: "row",
  },
  Line: {
    width: "95%",
    height: "1%",
    backgroundColor: "rgba(91,91,91,1)",
  },
  TimerContainer: {
    width: "100%",
    height: "49.5%",
    justifyContent: "center",
    flexDirection: "row",
  },
  RepeatTextContainer: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
  },
  ArrowContainer: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  TimerTextContainer: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
  },
  RepeatText: {
    color: "rgba(105,105,105,1)",
    fontSize: RFPercentage(2.5),
    paddingHorizontal: 20,
  },
  TimerText: {
    color: "rgba(105,105,105,1)",
    fontSize: RFPercentage(2.5),
    paddingHorizontal: 20,
  },
  ActionTextAndButtonContainer: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
  },
  ActionTextContainer: {
    width: "70%",
    height: "100%",
    justifyContent: "center",
  },
  AddActionButtonContainer: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ActionsText: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    paddingLeft: 20,
  },
  AddActionButton: {
    width: "30%",
    height: "50%",
    borderWidth: 2,
    borderColor: "rgba(21,21,21,1)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 40,
    maxHeight: 40,
    maxWidth: 50,
    minWidth: 35,
  },
  Devices: {
    width: "100%",
    height: "80%",
  },
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

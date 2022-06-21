import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function SeeAllCategorys() {
  const { platform } = useSelector((state) => state.counter);
  const dispatch = useDispatch;
  return (
    <View>
      <MobilePlatform platform={platform} dispatch={dispatch} />
    </View>
  );
}

const MobilePlatform = ({ platform, dispatch }) => {
  if (platform === "ios") {
    return <IOS dispatch={dispatch} />;
  } else if (platform === "android") {
    return <Android />;
  } else {
    return <View />;
  }
};

const IOS = ({ dispatch }) => {
  return (
    <SafeAreaView style={styles.IOS}>
      <AllViewsContainer_IOS dispatch={dispatch} />
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

const AllViewsContainer_IOS = ({ dispatch }) => {
  return <View style={styles.AllViewsContainer_IOS}></View>;
};

const styles = StyleSheet.create({
  Container_IOS: {
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
});

import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setPlatform } from "../../redux/createSlice";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function StartPage() {
  const Navigation = useNavigation();
  const { platform } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Platform.OS === "ios") {
      dispatch(setPlatform("ios"));
    } else if (Platform.OS === "android") {
      dispatch(setPlatform("android"));
    }
  }, []);
  return (
    <View style={styles.Container}>
      <MobilePlatform platform={platform} Navigation={Navigation} />
    </View>
  );
}

const MobilePlatform = ({ platform, Navigation }) => {
  if (platform === "ios") {
    return <IOS platform={platform} Navigation={Navigation} />;
  } else if (platform === "android") {
    return <Android platform={platform} Navigation={Navigation} />;
  } else {
    return <View />;
  }
};

const IOS = ({ platform, Navigation }) => {
  return (
    <SafeAreaView
      style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
    >
      <TouchableOpacity
        style={{
          width: 150,
          height: 80,
          backgroundColor: "blue",
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          Navigation.navigate("Login");
        }}
      >
        <Text>Go to home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const Android = ({ platform, Navigation }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <TouchableOpacity
        style={{
          width: 150,
          height: 80,
          backgroundColor: "blue",
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          Navigation.navigate("Home");
        }}
      >
        <Text>Go to home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

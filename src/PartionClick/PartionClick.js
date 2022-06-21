import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import {
  clear_device_list,
  setDevicesList,
  setPlatform,
} from "../../redux/createSlice";
import axios from "axios";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function PartionClick() {
  const platform = useSelector((state) => state.counter.platform);
  const devices_list = useSelector((state) => state.counter.devices_List);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Platform.OS == "ios") {
      dispatch(setPlatform("ios"));
    } else if (Platform.OS == "android") {
      dispatch(setPlatform("android"));
    }
    axios
      .get("http://192.168.2.213:8002/api/core/list-devices/?page=1&size=15", {
        headers: {
          Authorization: "Token " + "7c26362f41bbeebb94a08080b54f7a1099cd6fa9",
        },
      })
      .then((res) => {
        var myObject = res.data.Value.List.Mounted.Devices;
        var count = Object.keys(myObject).length;
        for (let index = 0; index < count; index++) {
          const dev_id = res.data.Value.List.Mounted.Devices[index]["id"];
          const dev_name = res.data.Value.List.Mounted.Devices[index]["name"];
          const dev_typ = res.data.Value.List.Mounted.Devices[index]["type"];
          dispatch(setDevicesList({ id: dev_id, type: dev_typ, dev_name }));
        }
        for (let index = 0; index < devices_list.length; index++) {
          dispatch(clear_device_list({ id: index }));
          console.log(devices_list);
        }

        console.log(devices_list.length);
      });
  }, []);
  return (
    <LinearGradient
      colors={["rgba(250,250,250,1)", "rgba(237,253,255,1)"]}
      style={[
        StyleSheet.absoluteFill,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <ThePlatform platform={platform} />
    </LinearGradient>
  );
}

const ThePlatform = ({ platform }) => {
  if (platform === "ios") {
    return <IOS />;
  } else if (platform === "android") {
    return <Android />;
  } else {
    return (
      <View
        style={{
          backgroundColor: "red",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>saocbdjh cdckldsjdso</Text>
      </View>
    );
  }
};

const IOS = () => {
  return <SafeAreaView style={styles.IOSContainer}></SafeAreaView>;
};

const Android = () => {
  return (
    <View style={{ backgroundColor: "red", width: width, height: height }} />
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContentl: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  IOSContainer: {
    width: width,
    height: height,
  },
});

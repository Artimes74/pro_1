import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Arrow from "../icons/Arrow";
import { ScenarioExistData } from "./ScenraiosExistData";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function ScenraiosExist() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.Container}>
        <FlatList
          data={ScenarioExistData}
          key={(item) => item.key}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={({ item, index }) => {
            return <Items item={item} index={index} />;
          }}
        />
      </View>
    </View>
  );
}

const Items = ({ item, index }) => {
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", paddingTop: 20 }}
    >
      <View style={styles.Box}>
        <View style={styles.Devices}>
          <View style={styles.ImageContainer}>
            <Image
              style={styles.MainImageStyle}
              resizeMode="contain"
              source={item.mainDevice}
            />
          </View>
          <Arrow
            width={35}
            height={35}
            color={"rgba(21,21,21,1)"}
            rotate={"270deg"}
          />
          {item.extraDevices.map((i, ind) => {
            return (
              <View key={ind} style={styles.ImageContainer}>
                <Image
                  style={styles.MainImageStyle}
                  resizeMode="contain"
                  source={i}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.Buttons}></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: "100%",
  },
  Box: {
    width: width * 0.9,
    height: height * 0.15,
    marginVertical: 10,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  Devices: {
    flexDirection: "row",
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ImageContainer: {
    width: "25%",
    height: "90%",
    borderRadius: 12,
    padding: 10,
    marginLeft: 10,
  },
  MainImageStyle: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Buttons: {
    width: 45,
    height: 45,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 22.5,
    shadowColor: "rgba(0,0,0,0.6)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 7,
    elevation: 5,
  },
});

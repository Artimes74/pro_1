import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { DateData } from "./DateData";
import * as Animatable from "react-native-animatable";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Calender() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.Container}>
        <FlatList
          data={DateData}
          key={(item) => item.key}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
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
    <Animatable.View
      duration={1000}
      animation={"bounceIn"}
      delay={item.id * 50}
      style={{ alignSelf: "center" }}
    >
      <TouchableOpacity style={styles.Box}>
        <Text style={styles.DateText}>{item.date}</Text>
        <Text style={styles.NameofDateText}>{item.nameofdate}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  Box: {
    width: width * 0.185,
    height: width * 0.3,
    backgroundColor: "rgba(255,255,255,1)",
    alignSelf: "center",
    marginHorizontal: 12,
    borderRadius: 50,
    shadowColor: "rgba(81,81,81,1)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  DateText: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    paddingBottom: 10,
  },
  NameofDateText: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
  },
});

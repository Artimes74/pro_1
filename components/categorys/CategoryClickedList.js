import React from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import { CategoryClickedListData } from "./CategoryClickedListData";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function CategoryClickedList() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.Container}>
        <FlatList
          data={CategoryClickedListData}
          key={(item) => item.key}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
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
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      <View style={styles.Items}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
  Items: {
    width: "85%",
    height: height * 0.14,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});

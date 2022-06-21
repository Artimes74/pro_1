import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Calender from "../../components/date/Calender";
import CategorysList from "../../components/categorys/CategorysList";
import axios from "axios";

export default function Notification() {
  return (
    <View style={styles.Container}>
      <DateContainer />
      <Category />
      <TextContainer />
    </View>
  );
}

const DateContainer = () => {
  return (
    <View style={styles.Date}>
      <Calender />
    </View>
  );
};

const Category = () => {
  return (
    <View style={styles.Category}>
      <CategorysList />
    </View>
  );
};

const TextContainer = () => {
  return (
    <View style={{ width: "100%", height: "60%" }}>
      <FlatList />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  Date: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  Category: {
    width: "100%",
    height: "15%",
  },
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Setting() {
  return (
    <View style={styles.Container}>
      <Text>Setting</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

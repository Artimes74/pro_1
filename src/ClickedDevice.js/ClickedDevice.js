import axios from "axios";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";

import { Url, Token } from "../../assets/strings/Strings";

export default function ClickedDevice() {
  const { deviceClicked } = useSelector((state) => state.counter);
  const Toggle = () => {
    console.log("artii");
    axios
      .post(
        Url + "/api/dimmer/toggle/",
        {
          device_id: 250,
        },
        {
          headers: { Authorization: Token },
        }
      )
      .then((res) => {
        res.data.value;
      });
  };

  const lightness = () => {
    axios
      .post(
        Url + "/api/dimmer/set-dimmer/",
        {
          device_id: 250,
          degree: 50,
        },
        {
          headers: { Authorization: Token },
        }
      )
      .then((res) => {
        console.log(res.data.value);
      });
  };
  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={{
          width: "80%",
          height: "10%",
          backgroundColor: "lightblue",
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          Toggle();
        }}
      >
        <Text
          style={{
            color: "rgba(21,21,21,1)",
            fontWeight: "bold",
            fontSize: RFPercentage(3),
          }}
        >
          on/off
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "80%",
          height: "10%",
          backgroundColor: "lightblue",
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
        onPress={() => {
          lightness();
        }}
      >
        <Text
          style={{
            color: "rgba(21,21,21,1)",
            fontWeight: "bold",
            fontSize: RFPercentage(3),
          }}
        >
          lightness
        </Text>
      </TouchableOpacity>
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

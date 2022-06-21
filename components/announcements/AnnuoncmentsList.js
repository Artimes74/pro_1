import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { AnnuoncementsData } from "./AnnuoncementsData";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

import Location from "../icons/Location";
import TempIconForWeather from "../icons/TempIconForWeather";
import Humidity from "../icons/Humidity";
import Wind from "../icons/Wind";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function AnnuoncmentsList() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.Container}>
        <FlatList
          data={AnnuoncementsData}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            justifyContent: "center",
          }}
          renderItem={({ item, index }) => {
            return <Items item={item} index={index} />;
          }}
        />
      </View>
    </View>
  );
}

const Items = ({ item, index }) => {
  if (item.topic === "weather") {
    return (
      <View style={styles.Items}>
        <View
          style={{
            width: "100%",
            height: "20%",
            justifyContent: "center",
            alignItems: "centers",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Location width={25} height={25} color={"rgba(21,21,21,1)"} />
            <Text style={{ fontSize: RFPercentage(2.3), paddingRight: 10 }}>
              Tehran
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "80%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "30%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TempIconForWeather
                width={15}
                height={15}
                color={"rgba(21,21,21,1)"}
              />
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: RFPercentage(2),
                    paddingLeft: 10,
                  }}
                >
                  {item.temp}
                </Text>
                <Text
                  style={{
                    color: "rgba(0,0,0,1)",
                    fontSize: RFPercentage(1.5),
                  }}
                >
                  °c
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Humidity width={15} height={15} color={"rgba(21,21,21,1)"} />
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: RFPercentage(2),
                    paddingLeft: 10,
                  }}
                >
                  {item.hum}
                </Text>
                <Text
                  style={{
                    color: "rgba(0,0,0,1)",
                    fontSize: RFPercentage(1.5),
                  }}
                >
                  %
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Wind width={15} height={15} color={"rgba(21,21,21,1)"} />
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: RFPercentage(2),
                    paddingLeft: 10,
                  }}
                >
                  {item.speedwind}
                </Text>
                <Text
                  style={{
                    color: "rgba(0,0,0,1)",
                    fontSize: RFPercentage(1.5),
                  }}
                >
                  Km
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "65%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: "70%", height: "70%" }}
              source={item.pic}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    );
  } else if (item.topic === "money") {
    return <View style={styles.Items}></View>;
  }
};

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingLeft: 10,
  },
  Items: {
    width: width * 0.5,
    height: "100%",
    borderRadius: 12,
    marginHorizontal: 15,
    backgroundColor: "rgba(216,234,242,1)",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  WeatherImage: {
    width: "50%",
    height: "75%",
  },

  TempAndLocation: {
    width: "60%",
    height: "100%",
  },
  LocationContainer: {
    width: "100%",
    height: "25%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  LocationText: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2),
  },
  TempContainer: {
    width: "100%",
    height: "75%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  TempNum: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(10),
  },
  Tempsymbol: {
    color: "rgba(180,180,180,1)",
    fontSize: RFPercentage(4),
  },
});

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import { Token, Url } from "../../assets/strings/Strings.js";
import {
  setAllPartitions,
  setPartionClicked,
} from "../../redux/createSlice.js";
import { PartionsData } from "./PartionsData.js";
import LivingRoom from "../../assets/img/partionPic/livingroom.jpg";
import BedRoom from "../../assets/img/partionPic/bedroom.jpg";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function PartionsList() {
  const { partionClick, allpartitions } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(Url + "/api/core/view_valid_areas/", {
        headers: { Authorization: Token },
      })
      .then((res) => {
        if (res.data.Value != null) {
          var ListLenght = Object.keys(res.data.Value.List).length;
          for (let index = 0; index < ListLenght; index++) {
            if (index % 2 == 0) {
              dispatch(
                setAllPartitions({
                  key: index,
                  id: res.data.Value.List[index]["id"],
                  name: res.data.Value.List[index]["name"],
                  pic: LivingRoom,
                })
              );
            } else {
              dispatch(
                setAllPartitions({
                  key: index,
                  id: res.data.Value.List[index]["id"],
                  name: res.data.Value.List[index]["name"],
                  pic: BedRoom,
                })
              );
            }
          }
          console.log(allpartitions);
        }
      });
  }, []);
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <View style={styles.Container}>
        <FlatList
          data={allpartitions}
          key={(item) => item.key}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          renderItem={({ item, index }) => {
            return (
              <PartionItems item={item} index={index} dispatch={dispatch} />
            );
          }}
        />
      </View>
    </View>
  );
}

const PartionItems = ({ item, index, dispatch }) => {
  const Navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.PartionItems}
        onPress={() => {
          dispatch(
            setPartionClicked({
              isclicked: {
                id: item.id,
                name: item.name,
                pic: item.pic,
              },
            })
          );
          Navigation.navigate("PartionClicked");
        }}
      >
        <Image style={styles.PartionImage} source={item.pic} />
        <View style={styles.NameContainer}>
          <Text style={styles.PartionNameText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: "95%",
    height: "100%",
  },
  PartionItems: {
    width: width * 0.7,
    height: "95%",
    alignSelf: "center",
    marginHorizontal: 12,
    borderRadius: (width * 0.7) / 2,
  },
  PartionImage: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "rgba(21,21,21,0.3)",
  },
  NameContainer: {
    width: "100%",
    height: "30%",
    backgroundColor: "rgba(31,31,31,0.6)",
    position: "absolute",
    bottom: 0,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  PartionNameText: {
    color: "rgba(255,255,255,1)",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  },
});

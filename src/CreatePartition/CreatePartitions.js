import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import Album from "../../components/album/Album";
import FlashArrow from "../../components/icons/FlashArrow";
import ForwardTo from "../../components/icons/ForwardTo";
import {
  setNameOfPartition,
  setShowForwardButton,
  setPictureName,
  setPartionClicked,
} from "../../redux/createSlice";
import axios from "axios";
import { Token, Url } from "../../assets/strings/Strings";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function CreatePartitions() {
  const { showForwardButton, nameOfPartition, pictureName } = useSelector(
    (state) => state.counter
  );
  const sendPartionCreated = () => {
    axios
      .post(
        Url + "/api/core/register-area/",
        {
          name: nameOfPartition,
          pic_name: pictureName,
          type: "3",
        },
        {
          headers: { Authorization: Token },
        }
      )
      .then((res) => {
        if (res.data.Status === "Succese") {
          console.log("id is :  " + res.data.Value.List.id);
          dispatch(
            setPartionClicked({
              isclicked: {
                name: nameOfPartition,
                pic: pictureName,
                id: res.data.Value.List.id,
              },
            })
          );
          Navigation.navigate("PartitionViewAdd");
        }
      });
  };
  const dispatch = useDispatch();
  const Navigation = useNavigation();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", BackPress);
  }, []);
  const BackPress = () => {
    Navigation.navigate("Dashboard");
    return true;
  };
  return (
    <View style={styles.Container}>
      <Album />
      <View style={styles.InputTextContainer}>
        <TextInput
          style={styles.InputText}
          placeholder={"Type your partition name"}
          placeholderTextColor="rgba(41,41,41,1)"
          onChangeText={(txt) => {
            if (txt != null) {
              dispatch(setShowForwardButton(true));
              dispatch(setNameOfPartition(txt));
            } else if (txt == null) {
              //dispatch(setShowForwardButton(false));
              dispatch(setNameOfPartition(null));
            }
          }}
        />
        {showForwardButton ? (
          <TouchableOpacity
            style={styles.DoneContainer}
            onPress={() => {
              sendPartionCreated();
            }}
          >
            <ForwardTo
              width={40}
              height={40}
              color={"rgba(180,238,182,1)"}
              rotate={"180deg"}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.BackContainer}>
        <TouchableOpacity
          style={styles.Back}
          onPress={() => {
            BackPress();
          }}
        >
          <FlashArrow
            width={30}
            height={30}
            color={"rgba(21,21,21,1)"}
            rotate={"0deg"}
          />
          <Text style={styles.BackText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  InputTextContainer: {
    width: width,
    height: "11%",
    position: "absolute",
    top: width * 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  InputText: {
    width: "95%",
    height: "90%",
    backgroundColor: "rgba(255,255,255,0.5)",
    alignSelf: "center",
    borderRadius: 10,
    paddingLeft: 20,
    fontSize: RFPercentage(2.5),
    alignSelf: "center",
  },
  BackContainer: {
    width: width,
    height: "10%",
    justifyContent: "center",
    position: "absolute",
    top: width * 0.1,
  },
  Back: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    backgroundColor: "transparent",
  },
  BackText: {
    color: "rgba(21,21,21,1)",
    paddingLeft: 10,
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },
  DoneContainer: {
    position: "absolute",
    top: width * 0.07,
    right: width * 0.05,
  },
});

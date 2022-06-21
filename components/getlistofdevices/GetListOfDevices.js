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
import { useDispatch, useSelector } from "react-redux";
import { Token, Url } from "../../assets/strings/Strings";
import {
  clear_device_list,
  setDeviceClicked,
  setMountedList,
  setShowScanDevices,
} from "../../redux/createSlice";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

import SpeakerDevices from "../../assets/img/devicePic/speaker.png";
import LockDevices from "../../assets/img/devicePic/lock.png";
import BellDevices from "../../assets/img/devicePic/bell.png";
import LightDevices from "../../assets/img/devicePic/light.png";
import CameraDevices from "../../assets/img/devicePic/cctv.png";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

let MyList = [];

export default function GetListOfDevices() {
  const { mountedList, deviceClicked, partionClick } = useSelector(
    (state) => state.counter
  );
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  useEffect(() => {
    axios
      .get(Url + "/api/core/list-devices/?page=1&size=15000", {
        headers: { Authorization: Token },
      })
      .then((res) => {
        var ListLenght = Object.keys(res.data.Value.List.Mounted).length;
        //console.log("isskln " + ListLenght);
        MyList = [];
        console.log(res.data.Value.List.Mounted);
        for (let index = 0; index < ListLenght; index++) {
          if (res.data.Value.List.Mounted[index]["Type"] == "Sensor") {
            MyList.push({
              key: index,
              id: res.data.Value.List.Mounted[index]["device_id"],
              name: res.data.Value.List.Mounted[index]["name"],
              type: res.data.Value.List.Mounted[index]["Type"],
              pic: LockDevices,
            });
            dispatch(
              setMountedList({
                key: index,
                id: res.data.Value.List.Mounted[index]["device_id"],
                name: res.data.Value.List.Mounted[index]["name"],
                type: res.data.Value.List.Mounted[index]["Type"],
                //pic: LockDevices,
              })
            );
          } else if (res.data.Value.List.Mounted[index]["Type"] == "Bell") {
            MyList.push({
              key: index,
              id: res.data.Value.List.Mounted[index]["device_id"],
              name: res.data.Value.List.Mounted[index]["name"],
              type: res.data.Value.List.Mounted[index]["Type"],
              pic: BellDevices,
            });
            dispatch(
              setMountedList({
                key: index,
                id: res.data.Value.List.Mounted[index]["device_id"],
                name: res.data.Value.List.Mounted[index]["name"],
                type: res.data.Value.List.Mounted[index]["Type"],
                //pic: BellDevices,
              })
            );
          } else if (res.data.Value.List.Mounted[index]["Type"] == "Dimmer") {
            MyList.push({
              key: index,
              id: res.data.Value.List.Mounted[index]["device_id"],
              name: res.data.Value.List.Mounted[index]["name"],
              type: res.data.Value.List.Mounted[index]["Type"],
              pic: LightDevices,
            });
            dispatch(
              setMountedList({
                key: index,
                id: res.data.Value.List.Mounted[index]["device_id"],
                name: res.data.Value.List.Mounted[index]["name"],
                type: res.data.Value.List.Mounted[index]["Type"],
                //pic: LightDevices,
              })
            );
          } else if (res.data.Value.List.Mounted[index]["Type"] == "Camera") {
            MyList.push({
              key: index,
              id: res.data.Value.List.Mounted[index]["device_id"],
              name: res.data.Value.List.Mounted[index]["name"],
              type: res.data.Value.List.Mounted[index]["Type"],
              pic: CameraDevices,
            });
            dispatch(
              setMountedList({
                key: index,
                id: res.data.Value.List.Mounted[index]["device_id"],
                name: res.data.Value.List.Mounted[index]["name"],
                type: res.data.Value.List.Mounted[index]["Type"],
                //pic: CameraDevices,
              })
            );
          } else if (res.data.Value.List.Mounted[index]["Type"] == "Speaker") {
            MyList.push({
              key: index,
              id: res.data.Value.List.Mounted[index]["device_id"],
              name: res.data.Value.List.Mounted[index]["name"],
              type: res.data.Value.List.Mounted[index]["Type"],
              pic: SpeakerDevices,
            });
            dispatch(
              setMountedList({
                key: index,
                id: res.data.Value.List.Mounted[index]["device_id"],
                name: res.data.Value.List.Mounted[index]["name"],
                type: res.data.Value.List.Mounted[index]["Type"],
                //pic: SpeakerDevices,
              })
            );
          }
        }

        // for (let index = 0; index < MyList.length; index++) {
        //   dispatch(
        //     setMountedList({
        //       key: index,
        //       id: 10,
        //       name: 10,
        //       type: 10,
        //       pic: 10,
        //     })
        //   );
        // }

        // dispatch(setMountedList(res.data.Value.List.Mounted));
        // console.log(mountedList);

        // for (let index = 0; index < MyList.length; index++) {
        //   dispatch(setMountedList({ device_id: [index]["id"] }));
        // }
      });
  }, []);
  let num = 0;
  const sendDevicetoadd = (deviceId) => {
    //console.log(deviceId);
    axios
      .post(
        Url + "/api/core/register-device_area/",
        {
          Area_Id: partionClick.isclicked.id,
          Device_Id: [deviceId],
        },
        { headers: { Authorization: Token } }
      )
      .then((res) => console.log(res.data));
  };
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.Container}>
        <FlatList
          data={MyList}
          key={(item) => item.key}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.DevicesItems}
                onPress={() => {
                  //Navigation.navigate("ClickedDevice");
                  setTimeout(() => {
                    dispatch(setShowScanDevices(false));
                  }, 0);
                  Navigation.reset({
                    routes: [{ name: "PartitionViewAdd" }],
                  });
                  // dispatch(
                  //   setDeviceClicked({
                  //     key: num + 1,
                  //     id: MyList[index]["id"],
                  //     name: MyList[index]["name"],
                  //     pic: MyList[index]["pic"],
                  //   })
                  // );

                  sendDevicetoadd(MyList[index]["id"]);
                  //console.log(index);
                  // console.log(deviceClicked);
                }}
              >
                {/* <item.pic
                  width={"90%"}
                  height={"75%"}
                  color={"rgba(21,21,21,1)"}
                /> */}
                <Image
                  style={{ width: "90%", height: "75%" }}
                  source={item.pic}
                  resizeMode="contain"
                />
                <Text style={styles.NameText}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: "90%",
    height: "98%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  DevicesItems: {
    width: width * 0.25,
    height: width * 0.25,
    margin: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  NameText: {
    marginTop: 10,
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
  },
});

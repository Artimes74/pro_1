import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import * as RactAnimated from "react-native/Libraries/Animated/Animated";
import { LinearGradient } from "expo-linear-gradient";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

import TempForPartions from "../../components/icons/TempForPartions";
import Add from "../../components/icons/Add";
import BottomSheetScanDevices from "../../components/bottomsheet/BottomSheetScanDevices";
import {
  deletDeviceAddInArea,
  setShowScanDevices,
  setDeviceAddInArea,
} from "../../redux/createSlice";
import axios from "axios";
import { Url, Token } from "../../assets/strings/Strings";
import { useNavigation } from "@react-navigation/native";
import SpeakerDevices from "../../assets/img/devicePic/speaker.png";
import LockDevices from "../../assets/img/devicePic/lock.png";
import BellDevices from "../../assets/img/devicePic/bell.png";
import LightDevices from "../../assets/img/devicePic/light.png";
import CameraDevices from "../../assets/img/devicePic/cctv.png";
import GetListOfDevices from "../../components/getlistofdevices/GetListOfDevices";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Coustomheight = height * 0.3;

export default function PartionClicked() {
  const top = useSharedValue(height);

  const animatationStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, {
        damping: 80,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
        stiffness: 500,
      }),
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value;
    },
    onActive(event, context) {
      top.value = context.startTop + event.translationY;
    },
    onEnd() {
      if (top.value > height / 2 + 200) {
        top.value = height;
      } else {
        top.value = height / 2;
      }
    },
  });
  const { partionClick, platform, partiontransparent, showScanDivces } =
    useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <View style={styles.Constainer}>
      <MobilePlatform
        platform={platform}
        dispatch={dispatch}
        partionClick={partionClick}
        partiontransparent={partiontransparent}
        showScanDivces={showScanDivces}
        gestureHandler={gestureHandler}
        animatationStyle={animatationStyle}
        top={top}
      />
    </View>
  );
}

const MobilePlatform = ({
  platform,
  dispatch,
  partionClick,
  partiontransparent,
  showScanDivces,
  gestureHandler,
  animatationStyle,
  top,
}) => {
  if (platform === "ios") {
    return (
      <IOS
        dispatch={dispatch}
        partionClick={partionClick}
        partiontransparent={partiontransparent}
        showScanDivces={showScanDivces}
        gestureHandler={gestureHandler}
        animatationStyle={animatationStyle}
        top={top}
      />
    );
  } else if (platform === "android") {
    return <Android />;
  } else {
    return <View />;
  }
};

const IOS = ({
  dispatch,
  partionClick,
  partiontransparent,
  showScanDivces,
  gestureHandler,
  animatationStyle,
  top,
}) => {
  return (
    <SafeAreaView style={styles.IOS}>
      <AllViewsContainer_IOS
        dispatch={dispatch}
        partionClick={partionClick}
        partiontransparent={partiontransparent}
        showScanDivces={showScanDivces}
        gestureHandler={gestureHandler}
        animatationStyle={animatationStyle}
        top={top}
      />
    </SafeAreaView>
  );
};

const Android = ({ partionClick, dispatch, partiontransparent }) => {
  return (
    <View style={styles.Android}>
      <Text>android</Text>
    </View>
  );
};

const AllViewsContainer_IOS = ({
  partionClick,
  dispatch,
  partiontransparent,
  showScanDivces,
  gestureHandler,
  animatationStyle,
  top,
}) => {
  const ScrollY = useRef(new RactAnimated.Value(0)).current;

  return (
    <View
      bounces={true}
      style={styles.AllViewsContainer_IOS}
      // onScroll={RactAnimated.event(
      //   [{ nativeEvent: { contentOffset: { y: ScrollY } } }],
      //   { useNativeDriver: true }
      // )}
    >
      <ImageOfPartion_IOS ScrollY={ScrollY} partionClick={partionClick} />
      <TempContainer_IOS />
      <Devices
        dispatch={dispatch}
        showScanDivces={showScanDivces}
        top={top}
        partionClick={partionClick}
      />
      <Scenario />
      {showScanDivces == true ? (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "rgba(0,0,0,0.3)" },
          ]}
          onPress={() => {
            top.value = withSpring(height);
            setTimeout(() => {
              dispatch(setShowScanDevices(false));
            }, 500);
          }}
        >
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.BottomSheetiStyle, animatationStyle]}>
              <Bottom top={top} dispatch={dispatch} />
            </Animated.View>
          </PanGestureHandler>
        </View>
      ) : null}
    </View>
  );
};

const ImageOfPartion_IOS = ({ partionClick, ScrollY }) => {
  return (
    <RactAnimated.View style={[styles.ImageOfPartionContainer_IOS]}>
      <Image
        style={styles.ImageOfPartionStyle_IOS}
        source={partionClick.isclicked.pic}
      />
      <LinearGradient
        colors={[
          "rgba(255,255,255,0.4)",
          "rgba(255,255,255,0.4)",
          "rgba(255,255,255,0.7)",
          "rgba(255,255,255,1)",
        ]}
        style={StyleSheet.absoluteFill}
      />
      <NameOfPartion partionClick={partionClick} />
    </RactAnimated.View>
  );
};

const ActionOfPartion = ({ partionClick }) => {
  return (
    <LinearGradient
      colors={["rgba(255,255,255,1)", "rgba(255,255,255,1)"]}
      style={styles.ActionOfPartionContainer_IOS}
    >
      <NameOfPartion partionClick={partionClick} />
      <TempContainer_IOS />
      <Devices />
      <Scenario />
    </LinearGradient>
  );
};

const NameOfPartion = ({ partionClick }) => {
  return (
    <RactAnimated.View style={[styles.NameOfPArtionContainer_IOS]}>
      <Text style={styles.NameOfPartionText_IOS}>
        {partionClick.isclicked.name}
      </Text>
    </RactAnimated.View>
  );
};

const TempContainer_IOS = () => {
  let Temp = null;
  useEffect(() => {
    axios
      .post(
        Url + "/api/sensor/term-sensor/",
        {
          device_id: 256,
        },
        {
          headers: { Authorization: Token },
        }
      )
      .then((res) => {
        Temp = res.data.Value.List.Temperature;
        console.log("temp is " + Temp);
      });
  }, []);
  return (
    <View style={styles.TempContainer_IOS}>
      <Text style={styles.TempText_IOS}>{Temp}°</Text>
      <View style={{ paddingTop: 30 }}>
        <TempForPartions width={32} height={32} color={"rgba(91,91,91,0.74)"} />
      </View>
    </View>
  );
};

// const Devices = ({ dispatch, showScanDivces, top }) => {
//   return (
//     <View style={styles.DevicesContainer_IOS}>
//       <View style={styles.DevicesTextAndAddButton_IOS}>
//         <View style={styles.DeviceTextContainer_IOS}>
//           <Text style={styles.DevicesText_IOS}>Devices</Text>
//         </View>
//         <View style={styles.AddDevicesContainer_IOS}>
//           <TouchableOpacity
//             style={styles.AddButton_IOS}
//             onPress={() => {
//               dispatch(setShowScanDevices(true));
//               console.log(showScanDivces);
//             }}
//           >
//             <Add width={25} height={25} color={"rgba(21,21,21,1)"} />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.ItemsDevices_IOS}></View>
//     </View>
//   );
// };

const Devices = ({ dispatch, showScanDivces, top, dev, partionClick }) => {
  const sendGetListDevices = () => {};
  const { deviceClicked, deviceAddInArea } = useSelector(
    (state) => state.counter
  );
  const Navigation = useNavigation();
  const GetDevicesInsidePartions = () => {
    axios
      .post(
        Url + "/api/core/view_device_area/?page=1&size=15000",

        {
          Id: partionClick.isclicked.id,
        },
        {
          headers: { Authorization: Token },
        }
      )
      .then((res) => {
        if (res.data.Value != null) {
          if (deviceAddInArea.length != 0) {
            for (let index = 0; index < deviceAddInArea.length; index++) {
              dispatch(deletDeviceAddInArea(deviceAddInArea[index]["key"]));
            }
          }
          var ListLenght = Object.keys(res.data.Value.List).length;
          for (let index = 0; index < ListLenght; index++) {
            if (res.data.Value.List[index]["Type"] == "Speaker") {
              dispatch(
                setDeviceAddInArea({
                  key: index,
                  id: res.data.Value.List[index]["device_id"],
                  name: res.data.Value.List[index]["name"],
                  pic: SpeakerDevices,
                })
              );
            } else if (res.data.Value.List[index]["Type"] == "Bell") {
              dispatch(
                setDeviceAddInArea({
                  key: index,
                  id: res.data.Value.List[index]["device_id"],
                  name: res.data.Value.List[index]["name"],
                  pic: BellDevices,
                })
              );
            } else if (res.data.Value.List[index]["Type"] == "Sensor") {
              dispatch(
                setDeviceAddInArea({
                  key: index,
                  id: res.data.Value.List[index]["device_id"],
                  name: res.data.Value.List[index]["name"],
                  pic: LockDevices,
                })
              );
            } else if (res.data.Value.List[index]["Type"] == "Dimmer") {
              dispatch(
                setDeviceAddInArea({
                  key: index,
                  id: res.data.Value.List[index]["device_id"],
                  name: res.data.Value.List[index]["name"],
                  pic: LightDevices,
                })
              );
            } else if (res.data.Value.List[index]["Type"] == "Camera") {
              dispatch(
                setDeviceAddInArea({
                  key: index,
                  id: res.data.Value.List[index]["device_id"],
                  name: res.data.Value.List[index]["name"],
                  pic: CameraDevices,
                })
              );
            }
          }
        }

        // if (res.data.Value.List != null) {
        //   if (deviceAddInArea.length != 0) {
        //     for (let index = 0; index < deviceAddInArea.length; index++) {
        //       dispatch(deletDeviceAddInArea(deviceAddInArea[index]["key"]));
        //     }
        //   }
        //   var ListLenght = Object.keys(res.data.Value.List).length;
        //   for (let index = 0; index < ListLenght; index++) {
        //     if (res.data.Value.List[index]["Type"] == "Speaker") {
        //       dispatch(
        //         setDeviceAddInArea({
        //           key: index,
        //           id: res.data.Value.List[index]["device_id"],
        //           name: res.data.Value.List[index]["name"],
        //           pic: SpeakerDevices,
        //         })
        //       );
        //     } else if (res.data.Value.List[index]["Type"] == "Bell")
        //       dispatch(
        //         setDeviceAddInArea({
        //           key: index,
        //           id: res.data.Value.List[index]["device_id"],
        //           name: res.data.Value.List[index]["name"],
        //           pic: BellDevices,
        //         })
        //       );
        //   }
        // }

        console.log(deviceAddInArea.length);
      });
  };
  useEffect(() => {
    GetDevicesInsidePartions();
    //setTimeout(() => console.log("asdsa"), 100);
  }, []);
  return (
    <View style={styles.DevicesContainer_IOS}>
      <View style={styles.DevicesTextAndAddButton_IOS}>
        <View style={styles.DeviceTextContainer_IOS}>
          <Text style={styles.DevicesText_IOS}>Devices</Text>
        </View>
        <View style={styles.AddDevicesContainer_IOS}>
          <TouchableOpacity
            style={styles.AddButton_IOS}
            onPress={() => {
              dispatch(setShowScanDevices(true));
              top.value = withSpring(height / 2.5, {
                damping: 80,
                overshootClamping: true,
                restDisplacementThreshold: 0.1,
                restSpeedThreshold: 0.1,
                stiffness: 500,
              });
              sendGetListDevices();
            }}
          >
            <Add width={25} height={25} color={"rgba(21,21,21,1)"} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ItemsDevices_IOS}>
        <FlatList
          data={deviceAddInArea}
          key={(item) => item.key}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  width: width * 0.2,
                  height: width * 0.2,
                  marginHorizontal: 10,
                  alignSelf: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  Navigation.navigate("ClickedDevice");
                }}
              >
                <Image
                  source={item.pic}
                  style={{ width: "90%", height: "90%" }}
                  Imagestyle={{ backgroundColor: "red" }}
                />
                <Text style={{ color: "rgba(21,21,21,1)", fontSize: 12 }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};
const Scenario = () => {
  return (
    <View style={styles.ScenariosContainer_IOS}>
      <View style={styles.ScenariosTextAndAddButton_IOS}>
        <View style={styles.ScenariosTextContainer_IOS}>
          <Text style={styles.ScenariosText_IOS}>Scenario</Text>
        </View>
        <View style={styles.AddScenariosContainer_IOS}></View>
      </View>
      <View style={styles.ItemsScenarios_IOS}></View>
    </View>
  );
};

const Bottom = ({ top, dispatch }) => {
  const Navigation = useNavigation();

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        },
      ]}
    >
      <View style={styles.AddDeviceTextContainer}>
        <TouchableOpacity
          onPress={() => {
            // Navigation.navigate("addDevice");
            top.value = withSpring(height);
            setTimeout(() => {
              dispatch(setShowScanDevices(false));
            }, 500);
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Add width={15} height={15} color={"rgba(45,211,244,1)"} />
          <Text style={styles.AddDeviceText}>Add Device</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ListStyle}>
        <GetListOfDevices />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Constainer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  IOS: {
    flex: 1,
  },
  Android: {
    flex: 1,
  },
  AllViewsContainer_IOS: {
    flex: 1,
  },
  ImageOfPartionContainer_IOS: {
    width: "100%",
    height: "25%",
  },
  ImageOfPartionStyle_IOS: {
    width: "100%",
    height: "100%",
  },
  ActionOfPartionContainer_IOS: {
    width: "100%",
    height: height * 0.915,
    backgroundColor: "transparent",
  },
  NameOfPArtionContainer_IOS: {
    width: "100%",
    height: "30%",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  NameOfPartionText_IOS: {
    color: "rgba(21,21,21,1)",
    fontWeight: "bold",
    paddingLeft: 10,
    fontSize: RFPercentage(3),
  },
  TempContainer_IOS: {
    width: "100%",
    height: "12%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 20,
  },
  TempText_IOS: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(9),
    fontWeight: "bold",
  },
  DevicesContainer_IOS: {
    width: "100%",
    height: "31.5%",
  },
  DevicesTextAndAddButton_IOS: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
  },
  DeviceTextContainer_IOS: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
  },
  AddDevicesContainer_IOS: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  DevicesText_IOS: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(3),
    fontWeight: "bold",
    paddingLeft: 10,
  },
  AddButton_IOS: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 4,
    marginRight: 20,
    borderWidth: 2,
    borderColor: "rgba(21,21,21,1)",
    justifyContent: "center",
    alignItems: "center",
  },
  ItemsDevices_IOS: {
    width: "100%",
    height: "80%",
  },
  ScenariosContainer_IOS: {
    width: "100%",
    height: "31.5%",
  },
  ScenariosTextAndAddButton_IOS: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
  },
  ScenariosTextContainer_IOS: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
  },
  AddScenariosContainer_IOS: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  ScenariosText_IOS: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(3),
    fontWeight: "bold",
    paddingLeft: 10,
  },
  ItemsScenarios_IOS: {
    width: "100%",
    height: "80%",
  },
  AddDeviceTextContainer: {
    width: "100%",
    height: "20%",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  AddDeviceText: {
    color: "rgba(45,211,244,1)",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    paddingRight: 20,
    paddingLeft: 2,
  },
  ListStyle: {
    width: "100%",
    height: "80%",
  },
});

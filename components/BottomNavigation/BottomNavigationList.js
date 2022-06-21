import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setBottomNavAnimation,
  setBottomNavPage,
  setisBottomClicked,
} from "../../redux/createSlice";
import { BottomNavigationData } from "./BottomNavigationData";
import * as Animatable from "react-native-animatable";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function BottomNavigationList({ isClicked }) {
  const { bottomNavAnimation } = useSelector((state) => state.counter);
  const BottomListref = useRef(null);
  const BottomListref2 = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // BottomListref.current.animate({
    //   0: { scale: 1, rotate: "0deg" },
    //   1: { scale: 1.2, rotate: "360deg" },
    // });
    // BottomListref2.current.animate({
    //   0: { scale: 1.2, rotate: "360deg" },
    //   1: { scale: 1, rotate: "0deg" },
    // });

    console.log(isClicked);
  }, [bottomNavAnimation]);
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <View style={styles.Container}>
        {BottomNavigationData.map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1 / 4,
              }}
              key={item.key}
              onPress={() => {
                dispatch(setisBottomClicked(item.name));
                dispatch(setBottomNavAnimation(item.name));
                dispatch(setBottomNavPage(item.page));
              }}
            >
              {isClicked === item.name ? (
                <Animatable.View
                  ref={BottomListref}
                  duration={1000}
                  animation={"swing"}
                >
                  <item.iconCilked
                    width={35}
                    height={35}
                    color={"rgba(21,21,21,1)"}
                  />
                </Animatable.View>
              ) : (
                <Animatable.View ref={BottomListref2} duration={1000}>
                  <item.iconUncliked
                    width={30}
                    height={30}
                    color={"rgba(21,21,21,1)"}
                  />
                </Animatable.View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const BottomNavItems = ({ item, index, dispatch, clicked }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: width * 0.2,
      }}
    >
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {clicked == item.name ? (
          <item.iconCilked width={25} height={25} color={"blue"} />
        ) : (
          <item.iconUncliked width={25} height={25} color={"yellow"} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderTopColor: "rgba(51,51,51,0.6)",
    borderTopWidth: 2,
  },
});

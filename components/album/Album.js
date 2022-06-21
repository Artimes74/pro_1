import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveIndexOfPartitionsPic,
  setNameOfPartition,
  setPictureName,
} from "../../redux/createSlice";
import { AlbumData } from "./AlbumData";
import LivingRoom from "../../assets/img/partionPic/livingroom.jpg";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Album() {
  useEffect(() => {
    dispatch(setPictureName(LivingRoom));
    console.log("hello");
  }, []);
  const { activeIndexOfPartitionsPic } = useSelector((state) => state.counter);
  const topRef = useRef();
  const thumbRef = useRef();
  const dispatch = useDispatch();
  const scrollX = useRef(new Animated.Value(0)).current;
  const ActiveIndex = (index) => {
    dispatch(setActiveIndexOfPartitionsPic(index));
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
      <FlatList
        ref={topRef}
        data={AlbumData}
        key={(item) => item.id}
        keyExtractor={(item) => item.id}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          ActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
        horizontal
        pagingEnabled={true}
        renderItem={({ item, index }) => {
          return <AlbumItems item={item} index={index} />;
        }}
      />

      <Animated.FlatList
        ref={thumbRef}
        data={AlbumData}
        key={(item) => item.key}
        keyExtractor={(item) => item.id}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          justifyContent: "center",
        }}
        style={{ position: "absolute", bottom: width * 0.2 }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                ActiveIndex(index);
                dispatch(setPictureName(item.name));
              }}
            >
              <Image
                style={[
                  styles.AlbumListItems,
                  {
                    borderWidth: 2.5,
                    borderColor:
                      activeIndexOfPartitionsPic === index
                        ? "rgba(255,255,255,1)"
                        : "transparent",

                    marginTop: activeIndexOfPartitionsPic === index ? 0 : 20,
                  },
                ]}
                source={item.pic}
                resizeMode="cover"
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const AlbumItems = ({ item, index }) => {
  return (
    <View
      style={{
        width: width,
        height: height,
      }}
    >
      <Image
        style={{ width: width, height: height }}
        source={item.pic}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  AlbumList: {
    width: width,
    height: "20%",
    //backgroundColor: "rgba(0,0,0,0.2)",
  },
  AlbumListItems: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,1)",
  },
});

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MembersData } from "./MembersData";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function MembersList() {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <View style={styles.MembersContainer}>
        <FlatList
          data={MembersData}
          key={(item) => item.key}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            width: "80%",
            height: "100%",
          }}
          renderItem={({ item, index }) => {
            return <MemberItems item={item} index={index} />;
          }}
        />
      </View>
    </View>
  );
}

const MemberItems = ({ item, index }) => {
  return (
    <View
      style={[
        styles.MemberItems,
        {
          marginLeft: index == 0 ? 0 : -13,
          alignSelf: "center",
        },
      ]}
    >
      <Image style={styles.ImageOfMember} source={item.pic} />
    </View>
  );
};

const styles = StyleSheet.create({
  MembersContainer: {
    width: "95%",
    height: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  MemberItems: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 2,
  },
  ImageOfMember: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});

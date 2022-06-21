import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { setCategoryClicked } from "../../redux/createSlice";
import { CategorysData } from "./CategorysData";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function CategorysList() {
  const dispatch = useDispatch();
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
      <View style={styles.AllItemsContiner}>
        <FlatList
          data={CategorysData}
          key={(item) => item.key}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            justifyContent: "center",
          }}
          renderItem={({ item, index }) => {
            return (
              <CategoryItems item={item} index={index} dispatch={dispatch} />
            );
          }}
        />
      </View>
    </View>
  );
}
const CategoryItems = ({ item, index, dispatch }) => {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        dispatch(setCategoryClicked(item.category));
        Navigation.navigate("CategoryClicked");
      }}
    >
      <View style={[styles.CategoryItems, { backgroundColor: item.color }]}>
        <item.icon width={"50%"} height={"50%"} color={"rgba(21,21,21,1)"} />
      </View>
      <Text style={{ marginTop: 5 }}>{item.category}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  AllItemsContiner: {
    width: "95%",
    height: "100%",
  },
  CategoryItems: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    marginHorizontal: 9.5,
    justifyContent: "center",
    alignItems: "center",
  },
});

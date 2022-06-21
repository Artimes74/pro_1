import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import { setScenarioType } from "../../redux/createSlice";
import { TypeOfScenarioData } from "./TypeOfScenarioData";

export default function TypeOfScenario() {
  const { scenarioType } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.Container}>
        <FlatList
          data={TypeOfScenarioData}
          key={(item) => item.key}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <Items
                item={item}
                index={index}
                scenarioType={scenarioType}
                dispatch={dispatch}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const Items = ({ item, index, scenarioType, dispatch }) => {
  return (
    <TouchableOpacity
      style={{ justifyContent: "center", paddingHorizontal: 20 }}
      onPress={() => {
        dispatch(setScenarioType(item.name));
      }}
    >
      <Text style={styles.TextStyle}>{item.name}</Text>
      {scenarioType == item.name ? <View style={styles.EnableLine} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  TextStyle: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    marginBottom: 2,
  },
  EnableLine: {
    height: 4,
    backgroundColor: "rgba(51,51,51,1)",
    borderRadius: 12,
  },
});

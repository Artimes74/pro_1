import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Add from "../../components/icons/Add";
import ScenraiosExist from "../../components/Scenarios/ScenraiosExist";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Scenarios() {
  return (
    <View style={styles.Container}>
      <ScenarioTextAndCreateButton />
      <ScenariosCreated />
    </View>
  );
}

const ScenarioTextAndCreateButton = () => {
  const Navigation = useNavigation();
  return (
    <View style={styles.ScenarioTextAndCreateButton}>
      <View style={styles.ScenarioTextContainer}>
        <Text style={styles.ScenarioText}>Scenario</Text>
      </View>
      <View style={styles.ScenarioButtonCreateContainer}>
        <TouchableOpacity
          style={styles.ScenarioButtonCreate}
          onPress={() => {
            Navigation.navigate("CreateScenario");
          }}
        >
          <Add width={"70%"} height={"90%"} color={"rgba(21,21,21,1)"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ScenariosCreated = () => {
  return (
    <View style={styles.ScenariosCreated}>
      <ScenraiosExist />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  ScenarioTextAndCreateButton: {
    width: "100%",
    height: "15%",
    flexDirection: "row",
  },
  ScenarioTextContainer: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
  },
  ScenarioButtonCreateContainer: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  ScenariosCreated: {
    width: "100%",
    height: "85%",
  },
  ScenarioText: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(3.5),
    fontWeight: "bold",
    paddingLeft: 10,
  },
  ScenarioButtonCreate: {
    width: width * 0.1,
    height: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(21,21,21,1)",
    borderRadius: (width * 0.1) / 4,
    marginRight: 20,
  },
});

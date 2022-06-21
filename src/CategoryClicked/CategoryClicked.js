import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import CategoryClickedList from "../../components/categorys/CategoryClickedList";

export default function CategoryClicked({}) {
  const { categoryClick, platform } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <View style={styles.Container}>
      <MobilePlatform
        platform={platform}
        dispatch={dispatch}
        categoryClick={categoryClick}
      />
    </View>
  );
}

const MobilePlatform = ({ platform, dispatch, categoryClick }) => {
  if (platform === "ios") {
    return <IOS dispatch={dispatch} categoryClick={categoryClick} />;
  } else if (platform === "android") {
    return <Android />;
  } else {
    return <View />;
  }
};

const IOS = ({ placename, dispatch, categoryClick }) => {
  return (
    <SafeAreaView style={styles.IOS}>
      <AllViewsContainer_IOS
        dispatch={dispatch}
        categoryClick={categoryClick}
      />
    </SafeAreaView>
  );
};

const Android = ({ placename, dispatch }) => {
  return (
    <View style={styles.Android}>
      <Text>android</Text>
    </View>
  );
};

const AllViewsContainer_IOS = ({ placename, dispatch, categoryClick }) => {
  return (
    <View style={styles.AllViewsContainer_IOS}>
      <View style={styles.CategoryNameContainer_IOS}>
        <Text style={styles.CategoryNameText_IOS}>{categoryClick}</Text>
      </View>
      <View style={styles.CategoryListContainer_IOS}>
        <CategoryClickedList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
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
  CategoryNameContainer_IOS: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
  },
  CategoryNameText_IOS: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(4),
    fontWeight: "bold",
    paddingLeft: 20,
  },
  CategoryListContainer_IOS: {
    width: "100%",
    height: "90%",
  },
});

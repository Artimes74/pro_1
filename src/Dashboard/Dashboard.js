import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import BottomNavigationList from "../../components/BottomNavigation/BottomNavigationList";
import Home from "../Home/Home";
import Scenarios from "../Scenarios/Scenarios";
import Notification from "../Notification/Notification";
import Setting from "../Setting/Setting";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Dashboard() {
  const { platform, placename, isBottomClicked, bottomNavPage } = useSelector(
    (state) => state.counter
  );
  return (
    <View style={styles.Container}>
      <MobilePlatform
        platform={platform}
        isBottomClicked={isBottomClicked}
        bottomNavPage={bottomNavPage}
      />
    </View>
  );
}

const MobilePlatform = ({
  platform,
  placename,
  dispatch,
  isBottomClicked,
  bottomNavPage,
}) => {
  if (platform === "ios") {
    return (
      <IOS
        placename={placename}
        dispatch={dispatch}
        isBottomClicked={isBottomClicked}
        bottomNavPage={bottomNavPage}
      />
    );
  } else if (platform === "android") {
    return <Android />;
  } else {
    return <View />;
  }
};

const IOS = ({ placename, dispatch, isBottomClicked, bottomNavPage }) => {
  return (
    <SafeAreaView style={styles.IOS}>
      <AllViewsContainer_IOS
        placename={placename}
        dispatch={dispatch}
        isBottomClicked={isBottomClicked}
        bottomNavPage={bottomNavPage}
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

const AllViewsContainer_IOS = ({ isBottomClicked, bottomNavPage }) => {
  return (
    <SafeAreaView style={styles.AllViewsContainer_IOS}>
      <FragmentView bottomNavPage={bottomNavPage} />
      <BottomNavigationView isBottomClicked={isBottomClicked} />
    </SafeAreaView>
  );
};

const FragmentView = ({ bottomNavPage }) => {
  if (bottomNavPage == "Home") {
    return (
      <View style={styles.FragmentView}>
        <Home />
      </View>
    );
  } else if (bottomNavPage == "Scenario") {
    return (
      <View style={styles.FragmentView}>
        <Scenarios />
      </View>
    );
  } else if (bottomNavPage == "Notifications") {
    return (
      <View style={styles.FragmentView}>
        <Notification />
      </View>
    );
  } else if (bottomNavPage == "Setting") {
    return (
      <View style={styles.FragmentView}>
        <Setting />
      </View>
    );
  }
};

const BottomNavigationView = ({ isBottomClicked }) => {
  return (
    <View style={styles.BottomNavigationView}>
      <BottomNavigationList isClicked={isBottomClicked} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "rgba(1,5,51,1)",
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
  FragmentView: {
    width: "100%",
    height: "90%",
    backgroundColor: "rgba(1,5,51,1)",
  },
  BottomNavigationView: {
    width: "100%",
    height: "10%",
  },
});

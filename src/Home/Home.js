import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import { setPlaceName, setShowCreateArea } from "../../redux/createSlice";
import MembersList from "../../components/members/MembersList";

import Add from "../../components/icons/Add";
import Location from "../../components/icons/Location";
import Sunny from "../../assets/img/weatherPic/sun.png";
import CategorysList from "../../components/categorys/CategorysList";
import PartionsList from "../../components/partions/PartionsList";
import { LinearGradient } from "expo-linear-gradient";
import AnnuoncmentsList from "../../components/announcements/AnnuoncmentsList";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Home() {
  const { platform, placename, showCreateArea } = useSelector(
    (state) => state.counter
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlaceName("Area"));
  }, []);
  return (
    <View style={styles.Container}>
      <MobilePlatform
        platform={platform}
        placename={placename}
        dispatch={dispatch}
        ShowCreateArea={showCreateArea}
      />
    </View>
  );
}

const MobilePlatform = ({ platform, placename, dispatch, ShowCreateArea }) => {
  if (platform === "ios") {
    return (
      <IOS
        placename={placename}
        dispatch={dispatch}
        ShowCreateArea={ShowCreateArea}
      />
    );
  } else if (platform === "android") {
    return <Android />;
  } else {
    return <View />;
  }
};

const IOS = ({ placename, dispatch, ShowCreateArea }) => {
  return (
    <SafeAreaView style={styles.IOS}>
      <AllViewsContainer_IOS
        placename={placename}
        dispatch={dispatch}
        ShowCreateArea={ShowCreateArea}
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

const AllViewsContainer_IOS = ({ placename, dispatch, ShowCreateArea }) => {
  return (
    <View style={styles.AllViewsContainer_IOS}>
      <PlaceNameAndAddButtonContainer_IOS
        placename={placename}
        dispatch={dispatch}
      />
      <PlaceMemberTextAndMembers_IOS placename={placename} />
      <Weather_IOS />
      <DevicesContainer_IOS />
      <PartionContainer_IOS />
    </View>
  );
};

const PlaceNameAndAddButtonContainer_IOS = ({ placename, dispatch }) => {
  const Navigation = useNavigation();
  return (
    <View style={styles.PlaceNameAndAddButtonContainer_IOS}>
      <View style={styles.placeNameContainer_IOS}>
        <Text style={styles.PlaceNameTxet_IOS}>{placename}</Text>
      </View>
      <View style={styles.AddButtonContainer_IOS}>
        <TouchableOpacity
          style={styles.AddButton_IOS}
          onPress={() => {
            Navigation.navigate("CreatePartitions");
          }}
        >
          <Add width={"70%"} height={"70%"} color={"rgba(61,61,61,1)"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PlaceMemberTextAndMembers_IOS = ({ placename }) => {
  return (
    <View style={styles.PlaceMemberTextAndMembersContainer_IOS}>
      <View style={styles.placeNameMemberTextContainer_IOS}>
        <Text style={styles.placeNameMemberText_IOS}>{placename} Members</Text>
      </View>
      <View style={styles.MembersContainer_IOS}>
        <MembersList />
      </View>
    </View>
  );
};

const Weather_IOS = () => {
  return (
    <View style={styles.Weather_IOS}>
      <AnnuoncmentsList />
    </View>
  );
};

const DevicesContainer_IOS = () => {
  const Navigation = useNavigation();
  return (
    <View style={styles.DevicesContainer_IOS}>
      <View style={styles.TextContainer_IOS}>
        <View style={styles.DevicesTextContainer_IOS}>
          <Text style={styles.DevicesText_IOS}>Devices</Text>
        </View>
        <TouchableOpacity
          style={styles.SeeAllTextContainer_IOS}
          onPress={() => {
            Navigation.navigate("SeeAllCategorys");
          }}
        >
          <Text style={styles.SeeAllText_IOS}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.DevicesItemsContainer_IOS}>
        <CategorysList />
      </View>
    </View>
  );
};

const PartionContainer_IOS = () => {
  const Navigation = useNavigation();
  return (
    <View style={styles.PartionContainer_IOS}>
      <View style={styles.PartionTextAndSeeAllContainer_IOS}>
        <View style={styles.PartionTextContainer_IOS}>
          <Text style={styles.RoomText_IOS}>Rooms</Text>
        </View>
        <TouchableOpacity
          style={styles.PartionSeeAllTextContainer_IOS}
          onPress={() => {
            Navigation.navigate("SeeAllPartions");
          }}
        >
          <Text style={styles.SeeAllRoomText_IOS}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.PartionItmsListContainer_IOS}>
        <PartionsList />
      </View>
    </View>
  );
};

const BottomNavigationContainer_IOS = () => {
  return (
    <View style={styles.BottomNavigationContainer_IOS}>
      <View style={styles.BottomNav_IOS}></View>
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
    // backgroundColor: "white",
  },
  PlaceNameAndAddButtonContainer_IOS: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  placeNameContainer_IOS: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
  },
  AddButtonContainer_IOS: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 5,
  },
  PlaceNameTxet_IOS: {
    color: "rgba(41,41,41,1)",
    fontSize: RFPercentage(3),
  },
  AddButton_IOS: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 4,
    borderWidth: 1,
    borderColor: "rgba(81,81,81,1)",
    justifyContent: "center",
    alignItems: "center",
  },
  PlaceMemberTextAndMembersContainer_IOS: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
  },
  placeNameMemberTextContainer_IOS: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
  },
  MembersContainer_IOS: {
    width: "50%",
    height: "100%",
  },
  placeNameMemberText_IOS: {
    color: "rgba(41,41,41,1)",
    fontSize: RFPercentage(2),
    paddingLeft: 20,
  },
  Weather_IOS: {
    width: "100%",
    height: "27%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
    flexDirection: "row",
  },
  Card_IOS: {
    width: "85%",
    height: "95%",
    backgroundColor: "rgba(203,231,252,1)",
    borderRadius: 22,
    flexDirection: "row",
  },
  WeatherImageContainer_IOS: {
    width: "45%",
    height: "100%",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  LocationAndTempAndWeatherText_IOS: {
    width: "55%",
    height: "100%",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: "center",
  },
  Location_IOS: {
    width: "100%",
    height: "23%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 10,
  },
  LocationText_IOS: {
    fontSize: RFPercentage(2.5),
  },
  TempContainer_IOS: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  WeatherTxetContainer_IOS: {
    width: "100%",
    height: "27%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  TempText_IOS: {
    fontSize: RFPercentage(11),
    paddingLeft: 15,
  },
  SymbolText_IOS: {
    color: "rgba(181,181,181,1)",
    fontSize: RFPercentage(5),
    paddingBottom: 40,
  },
  weatherTextBox_IOS: {
    width: "70%",
    height: "85%",
    backgroundColor: "rgba(93,144,246,1)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  WeatherText_IOS: {
    color: "rgba(255,255,255,1)",
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },
  WeatherImage_IOS: {
    width: "50%",
    height: "60%",
    position: "absolute",
    top: "20%",
  },
  DevicesContainer_IOS: {
    width: "100%",
    height: "20%",
  },
  PartionContainer_IOS: {
    width: "100%",
    height: "33%",
  },
  BottomNavigationContainer_IOS: {
    width: "100%",
    height: "8%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  TextContainer_IOS: {
    width: "100%",
    height: "25%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  DevicesTextContainer_IOS: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  SeeAllTextContainer_IOS: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  DevicesText_IOS: {
    color: "rgba(255,255,255,1)",
    //color: "rgba(255,125,0,1)",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    paddingLeft: 10,
  },
  SeeAllText_IOS: {
    color: "rgba(255,142,3,1)",
    fontSize: RFPercentage(2.2),
    paddingRight: 20,
    fontWeight: "bold",
  },
  DevicesItemsContainer_IOS: {
    width: "100%",
    height: "75%",
  },
  PartionTextAndSeeAllContainer_IOS: {
    width: "100%",
    height: "30%",
    paddingHorizontal: 8,
    flexDirection: "row",
  },
  PartionItmsListContainer_IOS: {
    width: "100%",
    height: "70%",
  },
  PartionTextContainer_IOS: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
  },
  PartionSeeAllTextContainer_IOS: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  RoomText_IOS: {
    color: "white",
    fontSize: RFPercentage(2.5),
    paddingLeft: 15,
  },
  SeeAllRoomText_IOS: {
    color: "rgba(96,122,208,1)",
    fontSize: RFPercentage(2.2),
    paddingRight: 20,
    fontWeight: "bold",
  },
  BottomNav_IOS: {
    width: "100%",
    height: "90%",
    backgroundColor: "rgba(255,255,255,1)",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderTopColor: "rgba(21,21,21,1)",
    borderTopWidth: 2,
  },
});

{
  /* <View style={styles.Card_IOS}>
        <View style={styles.WeatherImageContainer_IOS} />
        <View style={styles.LocationAndTempAndWeatherText_IOS}>
          <View style={styles.Location_IOS}>
            <Location width={25} height={25} color={"rgba(21,21,21,1)"} />
            <Text style={styles.LocationText_IOS}>Tehran,iran</Text>
          </View>
          <View style={styles.TempContainer_IOS}>
            <Text style={styles.TempText_IOS}>24</Text>
            <Text style={styles.SymbolText_IOS}>°C</Text>
          </View>
          <View style={styles.WeatherTxetContainer_IOS}>
            <View style={styles.weatherTextBox_IOS}>
              <Text style={styles.WeatherText_IOS}>Sunny</Text>
            </View>
          </View>
        </View>
        <Image
          style={styles.WeatherImage_IOS}
          source={Sunny}
          resizeMode="contain"
        />
      </View> */
}

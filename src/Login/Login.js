import React, { useEffect, useState, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import { useSelector, useDispatch } from "react-redux";
import { setUserName, setPassword, setCamera } from "../../redux/createSlice";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

// get width and height of  smart phone
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

//import SVG icons
import Google from "../../components/icons/Google_Icon";
import AppleID from "../../components/icons/AppleID_Icon";
import Arrow from "../../components/icons/Arrow_Icon";
import Scaner from "../../components/icons/Scaner";

export default function Login() {
  const [capturePhoto, setCapturePhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  async function TakePicture() {
    const options = { quality: 1, base64: true };
    const data = await camRef.current.takePictureAsync(options);
    setCapturePhoto(data.uri);
    console.log(capturePhoto);
  }

  const sendphoto = () => {
    var tyty = new FormData();
    //tyty.append("file", capturePhoto, "image.jpg");
    tyty.append(
      "image",
      {
        name: "image.jpg",
        type: "image/jpg",
        uri: capturePhoto,
      },
      "image.jpg"
    );
    tyty.append("password", "123456");
    axios
      .post(
        "http://192.168.185.187:8002/api/owners/log-in_2/",

        tyty,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization:
              "Token " + "7c26362f41bbeebb94a08080b54f7a1099cd6fa9",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const { platform } = useSelector((state) => state.counter);
  const { username } = useSelector((state) => state.counter);
  const { password } = useSelector((state) => state.counter);
  const { camera } = useSelector((state) => state.counter);

  if (platform === "ios") {
    return (
      <IOS
        dispatch={dispatch}
        username={username}
        password={password}
        camera={camera}
      />
    );
  } else if (platform === "android") {
    return (
      <View style={styles.Container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={"rgba(250,250,250,1)"}
        />
        <Android
          dispatch={dispatch}
          username={username}
          password={password}
          camera={camera}
        />
      </View>
    );
  }
}

const IOS = ({ dispatch, username, password, camera }) => {
  return (
    <LinearGradient
      style={styles.Container}
      //colors={["rgba(250,250,250,1)", "rgba(219,233,246,1)"]}
      //colors={["rgba(219,233,246,1)", "rgba(219,233,246,1)"]}
      colors={["rgba(250,250,250,1)", "rgba(237,253,255,1)"]}
    >
      <SafeAreaView style={styles.SafeArewViewContainer_IOS}>
        <LoginFrame_IOS
          dispatch={dispatch}
          username={username}
          password={password}
          camera={camera}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const Android = ({ dispatch, username, password, camera }) => {
  return (
    <LinearGradient
      style={styles.Container}
      //colors={["rgba(250,250,250,1)", "rgba(198,228,255,1)"]}
      colors={["rgba(250,250,250,1)", "rgba(237,253,255,1)"]}
    >
      <View style={styles.SafeArewViewContainer_ANDROID}>
        <LoginFrame_ANDROID
          dispatch={dispatch}
          username={username}
          password={password}
          camera={camera}
        />
      </View>
    </LinearGradient>
  );
};

// ANDROID DEVICES .....
const LoginFrame_ANDROID = ({ dispatch, username, password, camera }) => {
  return (
    <View style={styles.AllViews_ANDROID}>
      {camera == "ok" ? (
        <View style={styles.SwichComponents}>
          <Title />
          <DescriptionTextForScanFaceContainer_ANDROID />
          <StartScanButtonAndIconContainer_ANDROID />
          <TypeOfLoginContainer_ANDROID camera={camera} dispatch={dispatch} />
        </View>
      ) : (
        <View style={styles.SwichComponents}>
          <Title />
          <LoginWithEmailOption_ANDROID />
          <TextInputsContainer_ANDROID dispatch={dispatch} />
          <ButtonLoginContainer_ANDROID
            username={username}
            password={password}
            dispatch={dispatch}
          />
          <TypeOfLoginContainer_ANDROID camera={camera} dispatch={dispatch} />
        </View>
      )}
    </View>
  );
};

const LoginWithEmailOption_ANDROID = () => {
  return (
    <View style={styles.LoginWithEmailOption_ANDROID}>
      <View style={styles.LoginWithEmailOptionTextContainer_ANDROID}>
        <Text style={styles.LoginWithEmailOptionText_ANDROID}>
          Log in with one of the following options.
        </Text>
      </View>
      <View style={styles.LoginWithEmailOptionButtonContainer_ANDROID}>
        <TouchableOpacity style={styles.LoginWithEmailOptionButton_ANDROID}>
          <Google width={"50%"} height={"65%"} color={"rgba(88,123,127,1)"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.LoginWithEmailOptionButton_ANDROID}>
          <AppleID width={"50%"} height={"65%"} color={"rgba(88,123,127,1)"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TextInputsContainer_ANDROID = ({ dispatch }) => {
  return (
    <View style={styles.TextInputsContainer_ANDROID}>
      <Text style={styles.TextOfTextInputs_ANDROID}>Username</Text>
      <TextInput
        style={styles.TextInputs_ANDROID}
        placeholder={"Enter your username"}
        placeholderTextColor={"rgba(191,191,191,1)"}
        onChangeText={(text) => {
          dispatch(setUserName(text));
        }}
      />
      <Text style={styles.TextOfTextInputs_ANDROID}>Password</Text>
      <TextInput
        style={styles.TextInputs_ANDROID}
        placeholder={"Enter your password"}
        placeholderTextColor={"rgba(191,191,191,1)"}
        onChangeText={(text) => {
          dispatch(setPassword(text));
        }}
      />
    </View>
  );
};

const ButtonLoginContainer_ANDROID = ({ username, password, dispatch }) => {
  let Navigation = useNavigation();
  const LoginClicked = () => {
    axios
      .post("http://192.168.37.137:8002/api/owners/log-in/", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status === "Token") {
          Navigation.navigate("Home");
        }
        //console.log(res.data.status);
      })
      .catch((err) => err);

    // axios
    //   .post("http://192.168.37.137:8002/api/owners/log-in/", {
    //     username: username,
    //     password: password,
    //   })
    //   .then((res) => {
    //     console.log(res.data.status);
    //   });
  };
  return (
    <View style={styles.ButtonLoginContainer_ANDROID}>
      <TouchableOpacity
        style={styles.ButtonLogin_ANDROID}
        onPress={() => LoginClicked()}
      >
        <LinearGradient
          style={styles.GradinetColorButton_ANDROID}
          //colors={["rgba(169,43,209,1)", "rgba(193,56,168,1)"]}
          colors={["rgba(88,123,127,1)", "rgba(88,123,127,1)"]}
          //colors={["rgba(44,55,20,1)", "rgba(44,55,20,1)"]}
          start={{ x: 0, y: 0.65 }}
          end={{ x: 1, y: 0.35 }}
        >
          <Text style={styles.LoginText_ANDROID}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.SignUpTextContainer_ANDROID}>
        {/* <Text style={styles.QuestionText_ANDROID}>Dont have account?</Text>
        <Text style={styles.SignUpText_ANDROID}>Sig up</Text> */}
      </View>
    </View>
  );
};

const TypeOfLoginContainer_ANDROID = ({ camera, dispatch }) => {
  return (
    <View style={styles.TypeOfLoginContainer_ANDROID}>
      <View style={styles.SwitcherBox_ANDROID}>
        <View style={styles.WithUsernameAndPassword_ANDROID}>
          <TouchableOpacity
            style={[
              styles.WithUsernameAndPasswordButton_ANDROID,
              {
                backgroundColor:
                  camera == "ok"
                    ? "rgba(250,250,250,0)"
                    : "rgba(152,179,178,1)",
              },
            ]}
            onPress={() => {
              dispatch(setCamera("no"));
            }}
          >
            <Text
              style={[
                styles.TextWithUsernameAndPassword_ANDROID,
                {
                  color:
                    camera == "ok"
                      ? "rgba(120,120,120,1)"
                      : "rgba(250,250,250,1)",
                },
              ]}
            >
              username
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.WithFaceID_ANDROID}>
          <TouchableOpacity
            style={[
              styles.WithFaceIDButton_ANDROID,
              {
                backgroundColor:
                  camera === "ok"
                    ? "rgba(152,179,178,1)"
                    : "rgba(255,255,255,0)",
              },
            ]}
            onPress={() => {
              dispatch(setCamera("ok"));
            }}
          >
            <Text
              style={[
                styles.TextWithFaceID_ANDROID,
                {
                  color:
                    camera === "ok"
                      ? "rgba(250,250,250,1)"
                      : "rgba(120,120,120,1)",
                },
              ]}
            >
              faceID
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const DescriptionTextForScanFaceContainer_ANDROID = () => {
  return (
    <View style={styles.DescriptionTextForScanFaceContainer_ANDROID}>
      <Text style={styles.VeriftText_ANDROID}>Verify Face ID</Text>
      <Text style={styles.ScanText_ANDROID}>
        Scan your face to verify your identity
      </Text>
    </View>
  );
};
const StartScanButtonAndIconContainer_ANDROID = () => {
  let Nav = useNavigation();
  const OpenCameraView = () => {
    Nav.navigate("CameraView");
  };
  return (
    <View style={styles.StartScanButtonAndIconContainer_ANDROID}>
      <View style={styles.IconScanFaceContainer_ANDROID}>
        <Scaner width={"80%"} height={"60%"} color={"rgba(152,179,178,1)"} />
      </View>
      <View style={styles.ButtonStartContainer_ANDROID}>
        <TouchableOpacity
          style={styles.ButtonStart_ANDROID}
          onPress={() => OpenCameraView()}
        >
          <LinearGradient
            style={styles.GradinetColorButton_ANDROID}
            colors={["rgba(88,123,127,1)", "rgba(88,123,127,1)"]}
            start={{ x: 0, y: 0.65 }}
            end={{ x: 1, y: 0.35 }}
          >
            <Text style={styles.GetStartedText_ANDROID}>Get started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// IOS DEVICE ......
const LoginFrame_IOS = ({ dispatch, username, password, camera }) => {
  return (
    <View style={styles.AllViews_IOS}>
      {camera == "ok" ? (
        <View style={styles.SwichComponents}>
          <Title />
          <DescriptionTextForScanFaceContainer_IOS />
          <StartScanButtonAndIconContainer_IOS />
          <TypeOfLoginContainer_IOS camera={camera} dispatch={dispatch} />
        </View>
      ) : (
        <View style={styles.SwichComponents}>
          <Title />
          <LoginWithEmailOption_IOS />
          <TextInputsContainer_IOS dispatch={dispatch} />
          <ButtonLoginContainer_IOS
            username={username}
            password={password}
            dispatch={dispatch}
          />
          <TypeOfLoginContainer_IOS camera={camera} dispatch={dispatch} />
        </View>
      )}
    </View>
  );
};

const Title = () => {
  return (
    <View style={styles.Title}>
      <TouchableOpacity style={styles.BackButton}>
        <Arrow
          width={"50%"}
          height={"75%"}
          color={"rgba(0,0,0,1)"}
          rotate={"90deg"}
        />
      </TouchableOpacity>
      <Text style={styles.TitleLoginText}>Log in</Text>
    </View>
  );
};

const LoginWithEmailOption_IOS = () => {
  return (
    <View style={styles.LoginWithEmailOption_IOS}>
      <View style={styles.LoginWithEmailOptionTextContainer_IOS}>
        <Text style={styles.LoginWithEmailOptionText_IOS}>
          Log in with one of the following options.
        </Text>
      </View>
      <View style={styles.LoginWithEmailOptionButtonContainer_IOS}>
        <TouchableOpacity style={styles.LoginWithEmailOptionButton_IOS}>
          <Google width={"50%"} height={"65%"} color={"rgba(88,123,127,1)"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.LoginWithEmailOptionButton_IOS}>
          <AppleID width={"50%"} height={"65%"} color={"rgba(88,123,127,1)"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TextInputsContainer_IOS = ({ dispatch }) => {
  return (
    <View style={styles.TextInputsContainer_IOS}>
      <Text style={styles.TextOfTextInputs_IOS}>Username</Text>
      <TextInput
        style={styles.TextInputs_IOS}
        placeholder={"Enter your username"}
        placeholderTextColor={"rgba(191,191,191,1)"}
        onChangeText={(text) => {
          dispatch(setUserName(text));
        }}
      />
      <Text style={styles.TextOfTextInputs_IOS}>Password</Text>
      <TextInput
        style={styles.TextInputs_IOS}
        placeholder={"Enter your password"}
        placeholderTextColor={"rgba(191,191,191,1)"}
        onChangeText={(text) => {
          dispatch(setPassword(text));
        }}
      />
    </View>
  );
};

const ButtonLoginContainer_IOS = ({ username, password, dispatch }) => {
  let Navigation = useNavigation();
  const LoginClicked = () => {
    LoginApi(username, password)
      .then((res) => {
        const aa = res;
        console.log(aa.status);
        if (aa.status === "Token") {
          Navigation.navigate("Home");
        }
      })
      .catch((e) => {
        console.log(e);
      });
    // axios
    //   .post("http://192.168.37.137:8002/api/owners/log-in/", {
    //     username: username,
    //     password: password,
    //   })
    //   .then((res) => {
    //     console.log(res.data.status);
    //   });
  };
  return (
    <View style={styles.ButtonLoginContainer_IOS}>
      <TouchableOpacity
        style={styles.ButtonLogin_IOS}
        onPress={() => LoginClicked()}
      >
        <LinearGradient
          style={styles.GradinetColorButton_IOS}
          //colors={["rgba(169,43,209,1)", "rgba(193,56,168,1)"]}
          colors={["rgba(88,123,127,1)", "rgba(88,123,127,1)"]}
          //colors={["rgba(44,55,20,1)", "rgba(44,55,20,1)"]}
          start={{ x: 0, y: 0.65 }}
          end={{ x: 1, y: 0.35 }}
        >
          <Text style={styles.LoginText_IOS}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.SignUpTextContainer_IOS}>
        {/* <Text style={styles.QuestionText}>Dont have account?</Text>
        <Text style={styles.SignUpText}>Sig up</Text> */}
      </View>
    </View>
  );
};

const TypeOfLoginContainer_IOS = ({ camera, dispatch }) => {
  return (
    <View style={styles.TypeOfLoginContainer_IOS}>
      <View style={styles.SwitcherBox_IOS}>
        <View style={styles.WithUsernameAndPassword_IOS}>
          <TouchableOpacity
            style={[
              styles.WithUsernameAndPasswordButton_IOS,
              {
                backgroundColor:
                  camera == "ok"
                    ? "rgba(250,250,250,0)"
                    : "rgba(152,179,178,1)",
              },
            ]}
            onPress={() => {
              dispatch(setCamera("no"));
            }}
          >
            <Text
              style={[
                styles.TextWithUsernameAndPassword_IOS,
                {
                  color:
                    camera == "ok"
                      ? "rgba(120,120,120,1)"
                      : "rgba(250,250,250,1)",
                },
              ]}
            >
              username
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.WithFaceID_IOS}>
          <TouchableOpacity
            style={[
              styles.WithFaceIDButton_IOS,
              {
                backgroundColor:
                  camera === "ok"
                    ? "rgba(152,179,178,1)"
                    : "rgba(255,255,255,0)",
              },
            ]}
            onPress={() => {
              dispatch(setCamera("ok"));
            }}
          >
            <Text
              style={[
                styles.TextWithFaceID_IOS,
                {
                  color:
                    camera === "ok"
                      ? "rgba(250,250,250,1)"
                      : "rgba(120,120,120,1)",
                },
              ]}
            >
              faceID
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const DescriptionTextForScanFaceContainer_IOS = () => {
  return (
    <View style={styles.DescriptionTextForScanFaceContainer_IOS}>
      <Text style={styles.VeriftText_IOS}>Verify Face ID</Text>
      <Text style={styles.ScanText_IOS}>
        Scan your face to verify your identity
      </Text>
    </View>
  );
};

const StartScanButtonAndIconContainer_IOS = () => {
  let Nav = useNavigation();
  const OpenCameraView = () => {
    // Nav.navigate("CamraView");
    Nav.navigate("Dashboard");
  };
  return (
    <View style={styles.StartScanButtonAndIconContainer_IOS}>
      <View style={styles.IconScanFaceContainer_IOS}>
        <Scaner width={"80%"} height={"60%"} color={"rgba(152,179,178,1)"} />
      </View>
      <View style={styles.ButtonStartContainer_IOS}>
        <TouchableOpacity
          style={styles.ButtonStart_IOS}
          onPress={() => OpenCameraView()}
        >
          <LinearGradient
            style={styles.GradinetColorButton_IOS}
            colors={["rgba(88,123,127,1)", "rgba(88,123,127,1)"]}
            start={{ x: 0, y: 0.65 }}
            end={{ x: 1, y: 0.35 }}
          >
            <Text style={styles.GetStartedText_IOS}>Get started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  SafeArewViewContainer_IOS: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  AllViews_IOS: {
    width: "100%",
    height: "100%",
  },
  Title: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    alignItems: "center",
  },
  SwichComponents: {
    width: "100%",
    height: "100%",
  },
  BackButton: {
    width: "12%",
    height: "28%",
    borderRadius: 8,
    marginHorizontal: 15,
    borderWidth: 2,
    borderColor: "rgba(100,100,100,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  TitleLoginText: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(4),
    fontWeight: "bold",
  },
  LoginWithEmailOption_IOS: {
    width: "100%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  LoginWithEmailOption_ANDROID: {
    width: "100%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  LoginWithEmailOptionTextContainer_IOS: {
    width: "100%",
    height: "30%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  LoginWithEmailOptionTextContainer_ANDROID: {
    width: "100%",
    height: "30%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  LoginWithEmailOptionText_IOS: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2),
    marginLeft: 8,
  },
  LoginWithEmailOptionText_ANDROID: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2),
    marginLeft: 8,
  },
  LoginWithEmailOptionButtonContainer_IOS: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  LoginWithEmailOptionButtonContainer_ANDROID: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  LoginWithEmailOptionButton_IOS: {
    width: "46%",
    height: "90%",
    borderRadius: 12,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "rgba(100,100,100,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  LoginWithEmailOptionButton_ANDROID: {
    width: "40%",
    height: "80%",
    borderRadius: 12,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "rgba(100,100,100,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  TextInputsContainer_IOS: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
  },
  TextInputsContainer_ANDROID: {
    width: "100%",
    height: "38%",
    justifyContent: "center",
  },
  TextOfTextInputs_IOS: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    marginLeft: 10,
  },
  TextOfTextInputs_ANDROID: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    marginLeft: 10,
  },
  TextInputs_IOS: {
    width: "80%",
    height: "22%",
    backgroundColor: "rgba(250,250,250,00.6)",
    borderRadius: 12,
    marginVertical: 18,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "rgba(191,191,191,1)",
    paddingLeft: 15,
    fontSize: RFPercentage(2),
  },
  TextInputs_ANDROID: {
    width: "80%",
    height: "20%",
    backgroundColor: "rgba(250,250,250,00.6)",
    borderRadius: 12,
    marginVertical: 18,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "rgba(191,191,191,1)",
    paddingLeft: 15,
    fontSize: RFPercentage(2),
  },
  ButtonLoginContainer_IOS: {
    width: "100%",
    height: "12.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonLoginContainer_ANDROID: {
    width: "100%",
    height: "12.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  LoginText_IOS: {
    color: "rgba(250,250,250,1)",
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },
  LoginText_ANDROID: {
    color: "rgba(250,250,250,1)",
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },
  ButtonLogin_IOS: {
    width: "80%",
    height: "70%",
    borderRadius: 12,
  },
  ButtonLogin_ANDROID: {
    width: "80%",
    height: "60%",
    borderRadius: 12,
  },
  GradinetColorButton_IOS: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  GradinetColorButton_ANDROID: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  SignUpTextContainer_IOS: {
    width: "100%",
    height: "25%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  QuestionText_IOS: {
    color: "rgba(149,149,149,1)",
    fontSize: RFPercentage(2),
  },
  QuestionText_ANDROID: {
    color: "rgba(149,149,149,1)",
    fontSize: RFPercentage(2),
  },
  SignUpText_IOS: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2),
  },
  SignUpText_ANDROID: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2),
  },
  TypeOfLoginContainer_IOS: {
    width: "100%",
    height: "12.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  TypeOfLoginContainer_ANDROID: {
    width: "100%",
    height: "14.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  SwitcherBox_IOS: {
    width: "60%",
    height: "80%",
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(190,190,190,1)",
  },
  SwitcherBox_ANDROID: {
    width: "60%",
    height: "60%",
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(190,190,190,1)",
  },
  WithUsernameAndPassword_IOS: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  WithUsernameAndPassword_ANDROID: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  WithUsernameAndPasswordButton_IOS: {
    width: "95%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(152,179,178,1)",
  },
  WithUsernameAndPasswordButton_ANDROID: {
    width: "95%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(152,179,178,1)",
  },
  TextWithUsernameAndPassword_IOS: {
    color: "rgba(250,250,250,1)",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
  },
  TextWithUsernameAndPassword_ANDROID: {
    color: "rgba(250,250,250,1)",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
  },
  WithFaceID_IOS: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  WithFaceID_ANDROID: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  WithFaceIDButton_IOS: {
    width: "95%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  WithFaceIDButton_ANDROID: {
    width: "95%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  TextWithFaceID_IOS: {
    color: "rgba(120,120,120,1)",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
  },
  TextWithFaceID_ANDROID: {
    color: "rgba(120,120,120,1)",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
  },
  DescriptionTextForScanFaceContainer_IOS: {
    width: "100%",
    height: "15%",
    justifyContent: "center",
  },
  DescriptionTextForScanFaceContainer_ANDROID: {
    width: "100%",
    height: "15%",
  },
  VeriftText_IOS: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(3.5),
    fontWeight: "bold",
    paddingLeft: 10,
    marginVertical: 5,
  },
  VeriftText_ANDROID: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(3.5),
    fontWeight: "bold",
    paddingLeft: 10,
    marginVertical: 5,
  },
  ScanText_IOS: {
    color: "rgba(41,41,41,1)",
    fontSize: RFPercentage(2),
    fontWeight: "normal",
    paddingLeft: 10,
    marginVertical: 8,
  },
  ScanText_ANDROID: {
    color: "rgba(41,41,41,1)",
    fontSize: RFPercentage(2),
    fontWeight: "normal",
    paddingLeft: 10,
    marginVertical: 8,
  },
  StartScanButtonAndIconContainer_IOS: {
    width: "100%",
    height: "52.5%",
  },
  StartScanButtonAndIconContainer_ANDROID: {
    width: "100%",
    height: "50.5%",
  },
  IconScanFaceContainer_IOS: {
    width: "100%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  IconScanFaceContainer_ANDROID: {
    width: "100%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonStartContainer_IOS: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonStartContainer_ANDROID: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonStart_IOS: {
    width: "80%",
    height: "75%",
    borderRadius: 12,
  },
  ButtonStart_ANDROID: {
    width: "80%",
    height: "65%",
    borderRadius: 12,
  },
  GetStartedText_IOS: {
    color: "rgba(250,250,250,1)",
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },
  GetStartedText_ANDROID: {
    color: "rgba(250,250,250,1)",
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },
});

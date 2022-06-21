import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  setFaceBox,
  setFaceDetected,
  setTakePic,
  setCapturePhoto,
  setShowOkPage,
} from "../../redux/createSlice";
import { Camera, Constants } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { RFPercentage } from "react-native-responsive-fontsize";
import axios from "axios";

export default function CameraView() {
  const camRef = useRef(null);
  const dispatch = useDispatch();
  const { face, facebox, takePic, capturePhoto, showOkPage } = useSelector(
    (state) => state.counter
  );
  const handelFaceDdetected = ({ faces }) => {
    dispatch(setFaceDetected(faces));
    if (face[0]) {
      dispatch(
        setFaceBox({
          boxs: {
            width: face[0].bounds.size.width,
            height: face[0].bounds.size.height,
            x: face[0].bounds.origin.x,
            y: face[0].bounds.origin.y,
          },
        })
      );
    } else {
      dispatch(setFaceBox(null));
    }
  };

  const GetFaceDateView = () => {
    if (face === 0) {
      return <View style={styles.face}></View>;
    } else {
      return face.map((face, index) => {
        const eyeShut =
          face.rightEyeOpenProbability < 0.4 &&
          face.leftEyeOpenProbability < 0.4;
        const winkking =
          !eyeShut &&
          (face.rightEyeOpenProbability < 0.4 ||
            face.leftEyeOpenProbability < 0.4);
        const smiling = face[0].smilingProbability > 0.7;
        return <View style={styles.face}></View>;
      });
    }
  };

  const sendphoto = () => {
    var tt = new FormData();
    //tyty.append("file", capturePhoto, "image.jpg");
    tt.append(
      "image",
      {
        name: "image.jpg",
        type: "image/jpg",
        uri: capturePhoto,
      },
      "image.jpg"
    );
    tt.append("password", "123456");
    axios
      .post(
        "http://192.168.37.137:8002/api/owners/log-in_2/",

        tt,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization:
              "Token " + "7c26362f41bbeebb94a08080b54f7a1099cd6fa9",
          },
        }
      )
      .then((res) => {
        if (res.data.Token === "Token") {
          dispatch(showOkPage(true));
        } else {
          dispatch(showOkPage(false));
        }
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  async function TakePicture() {
    console.log("a");
    const options = { quality: 1, base64: true, sound: null };
    const data = await camRef.current.takePictureAsync(options);
    console.log(data.uri);
    dispatch(setCapturePhoto(data.uri));
    //sendphoto();
    setTimeout(() => {
      sendphoto();
      console.log(capturePhoto);
    }, 1000);
    //console.log(capturePhoto);
  }

  useEffect(() => {
    //dispatch(setTakePic(0));
    setTimeout(() => {
      if (facebox != null) {
        // if (takePic < 3) {
        //   TakePicture();
        //   dispatch(setTakePic(takePic + 1));
        // }
        TakePicture();
      }
    }, 2000);
  }, []);
  return (
    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: "red" }]}>
      <StatusBar hidden={true} animated={true} />
      <Camera
        ref={camRef}
        style={{
          width: "100%",
          height: "100%",
        }}
        type={Camera.Constants.Type.front}
        ratio={"18:9"}
        onFacesDetected={handelFaceDdetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runclassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
        zoom={0.045}
      >
        <SafeAreaView>
          <Text style={styles.PleasText}>Please be in the</Text>
          <Text style={styles.MiddelText}>middle of the screen</Text>
          {facebox ? (
            <View
              style={{
                position: "absolute",
                width: facebox.boxs.width,
                height: facebox.boxs.height,
                top: facebox.boxs.y,
                left: facebox.boxs.x,
                borderColor: "rgba(255,234,76,1)",
                borderWidth: 1,
                borderRadius: 12,
                zIndex: 3000,
              }}
            />
          ) : (
            <View
              style={{
                position: "absolute",
                width: null,
                height: null,
                bottom: null,
                right: null,
                borderColor: "red",
                borderWidth: null,
                zIndex: 3000,
              }}
            />
          )}
        </SafeAreaView>
      </Camera>
      {showOkPage ? <Result /> : null}
    </View>
  );
}

const Result = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <StatusBar hidden={true} animated={true} />
      <SafeAreaView style={styles.absoluteFill}>
        <Text>ok</Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  PleasText: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(2),
    fontWeight: "normal",
    paddingLeft: 10,
    paddingTop: 15,
  },
  MiddelText: {
    color: "rgba(21,21,21,1)",
    fontSize: RFPercentage(3),
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 10,
  },
  Result: {
    width: "100%",
    height: "100%",
  },
});

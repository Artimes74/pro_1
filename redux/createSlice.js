import { createSlice } from "@reduxjs/toolkit";

let DEVICE_KEY = 0;
let DEVICE_ID = 0;
import LivingRoom from "../assets/img/partionPic/livingroom.jpg";

const initialState = {
  platform: "",
  devices_List: [],
  placename: "",
  isBottomClicked: "Home",
  bottomNavAnimation: "Home",
  bottomNavPage: "Home",
  partionClick: "",
  partiontransparent: "false",
  categoryClick: "",
  scenarioType: "Timer",
  showForwardButton: false,
  activeIndexOfPartitionsPic: 0,
  nameOfPartition: "",
  pictureName: LivingRoom,
  showScanDivces: false,
  pictureSelected: null,
  mountedList: [],
  deviceClicked: [],
  allpartitions: [],
  username: "",
  password: "",
  camera: null,
  face: "",
  facebox: "",
  showOkPage: "",
  capturePhoto: "",
  deviceAddInArea: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setPlatform: (state, action) => {
      state.platform = action.payload;
    },
    setDevicesList: (state, action) => {
      state.devices_List = [
        ...state.devices_List,
        {
          key: DEVICE_KEY++,
          id: action.payload.id,
          type: action.payload.type,
          name: action.payload.name,
        },
      ];
    },
    clear_device_list: (state, action) => {
      const { id } = action.payload;

      state.mountedList.splice(id, 1);
    },
    setPlaceName: (state, action) => {
      state.placename = action.payload;
    },
    setisBottomClicked: (state, action) => {
      state.isBottomClicked = action.payload;
    },
    setBottomNavAnimation: (state, action) => {
      state.bottomNavAnimation = action.payload;
    },
    setBottomNavPage: (state, action) => {
      state.bottomNavPage = action.payload;
    },
    setPartionClicked: (state, action) => {
      state.partionClick = action.payload;
    },
    setPartionTransparent: (state, action) => {
      state.partiontransparent = action.payload;
    },
    setCategoryClicked: (state, action) => {
      state.categoryClick = action.payload;
    },
    setScenarioType: (state, action) => {
      state.scenarioType = action.payload;
    },
    setShowForwardButton: (state, action) => {
      state.showForwardButton = action.payload;
    },
    setActiveIndexOfPartitionsPic: (state, action) => {
      state.activeIndexOfPartitionsPic = action.payload;
    },
    setNameOfPartition: (state, action) => {
      state.nameOfPartition = action.payload;
    },
    setPartitionAdd: (state, action) => {
      state.partitionAdd = action.payload;
    },
    setPictureName: (state, action) => {
      state.pictureName = action.payload;
    },
    setShowScanDevices: (state, action) => {
      state.showScanDivces = action.payload;
    },
    setPictureSelected: (state, action) => {
      state.pictureSelected = action.payload;
    },
    setMountedList: (state, action) => {
      // state.mountedList = [
      //   ...state.mountedList,
      //   {
      //     key: DEVICE_KEY++,
      //     id: DEVICE_ID++,
      //     device_id: action.payload.device_id,
      //     type: action.payload.type,
      //     name: action.payload.name,
      //     pic: action.payload.pic,
      //   },

      // ];
      state.mountedList.push(action.payload);
    },
    setDeviceClicked: (state, action) => {
      state.deviceClicked.push(action.payload);
    },
    setAllPartitions: (state, action) => {
      state.allpartitions.push(action.payload);
    },
    setUserame: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setCamera: (state, action) => {
      state.camera = action.payload;
    },
    setFaceBox: (state, action) => {
      state.facebox = action.payload;
    },
    setFaceDetected: (state, action) => {
      state.face = action.payload;
    },
    setCapturePhoto: (state, action) => {
      state.capturePhoto = action.payload;
    },
    setShowOkPage: (state, action) => {
      state.showOkPage = action.payload;
    },
    setDeviceAddInArea: (state, action) => {
      state.deviceAddInArea.push(action.payload);
    },
    deletDeviceAddInArea: (state, action) => {
      const { key } = action.payload;

      state.deviceAddInArea.splice(key, state.deviceAddInArea.length);
    },
  },
});

export const {
  setPlatform,
  setDevicesList,
  clear_device_list,
  setPlaceName,
  setisBottomClicked,
  setBottomNavAnimation,
  setBottomNavPage,
  setPartionClicked,
  setPartionTransparent,
  setCategoryClicked,
  setScenarioType,
  setShowForwardButton,
  setActiveIndexOfPartitionsPic,
  setNameOfPartition,
  setPictureName,
  setShowScanDevices,
  setMountedList,
  setDeviceClicked,
  setAllPartitions,
  setCamera,
  setUserame,
  setPassword,
  setFaceBox,
  setFaceDetected,
  setCapturePhoto,
  setShowOkPage,
  setDeviceAddInArea,
  deletDeviceAddInArea,
} = counterSlice.actions;

export default counterSlice.reducer;

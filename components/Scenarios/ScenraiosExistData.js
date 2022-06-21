import Blub1 from "../../assets/img/smartDevicesPic/smartblub3.jpg";
import Blub2 from "../../assets/img/smartDevicesPic/smartblub2.jpg";
import Blub3 from "../../assets/img/smartDevicesPic/smartblub1.jpg";
import Smoke from "../../assets/img/smartDevicesPic/smoke.jpg";
import Speaker from "../../assets/img/smartDevicesPic/speaker.jpg";
import Conditioner from "../../assets/img/smartDevicesPic/conditioner.jpg";

export const ScenarioExistData = [
  {
    id: 0,
    key: 0,
    name: "livingRoomLight",
    status: 1,
    mainDevice: Blub1,
    extraDevices: [Blub2, Blub3],
  },
  {
    id: 1,
    key: 1,
    name: "Fire",
    status: 0,
    mainDevice: Smoke,
    extraDevices: [Conditioner, Speaker],
  },
];

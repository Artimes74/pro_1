import HomeClicked from "../icons/HomeClicked";
import HomeUnclicked from "../icons/HomeUnclicked";
import ScenarioClicked from "../icons/ScenarioClicked";
import ScenarioUnClicked from "../icons/ScenarioUnclicked";
import NotificationClicked from "../icons/NotificationClicked";
import NotificationUnClicked from "../icons/NotificationUnclicked";
import SettingClicked from "../icons/SettingClicked";
import SettingUnClicked from "../icons/SettingUnclick";

export const BottomNavigationData = [
  {
    id: 0,
    key: 0,
    iconCilked: HomeClicked,
    iconUncliked: HomeUnclicked,
    name: "Home",
    page: "Home",
  },
  {
    id: 1,
    key: 1,
    iconCilked: ScenarioClicked,
    iconUncliked: ScenarioUnClicked,
    name: "Scenario",
    page: "Scenario",
  },
  {
    id: 2,
    key: 2,
    iconCilked: NotificationClicked,
    iconUncliked: NotificationUnClicked,
    name: "Notifications",
    page: "Notifications",
  },
  {
    id: 3,
    key: 3,
    iconCilked: SettingClicked,
    iconUncliked: SettingUnClicked,
    name: "Setting",
    page: "Setting",
  },
];

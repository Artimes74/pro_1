import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import StartPage from "../src/StartPage/StartPage";
import Home from "../src/Home/Home";
import Dashboard from "../src/Dashboard/Dashboard";
import PartionClicked from "../src/PartionClicked/PartionClicked";
import CategoryClicked from "../src/CategoryClicked/CategoryClicked";
import SeeAllCategorys from "../src/SeeAll/SeeAllCategorys";
import SeeAllPartionss from "../src/SeeAll/SeeAllPartionss";
import CreateScenarios from "../src/CreateScenarios/CreateScenarios";
import CreatePartitions from "../src/CreatePartition/CreatePartitions";
import PartionViewAdd from "../src/PartionViewAdd/PartionViewAdd";
import ClickedDevice from "../src/ClickedDevice.js/ClickedDevice";
import Login from "../src/Login/Login";
import CameraView from "../src/CameraView/CameraView";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StartPage" component={StartPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CamraView" component={CameraView} />
      <Stack.Screen name="PartionClicked" component={PartionClicked} />
      <Stack.Screen name="CategoryClicked" component={CategoryClicked} />
      <Stack.Screen name="SeeAllCategorys" component={SeeAllCategorys} />
      <Stack.Screen name="SeeAllPartions" component={SeeAllPartionss} />
      <Stack.Screen name="CreateScenario" component={CreateScenarios} />
      <Stack.Screen name="CreatePartitions" component={CreatePartitions} />
      <Stack.Screen name="PartitionViewAdd" component={PartionViewAdd} />
      <Stack.Screen name="ClickedDevice" component={ClickedDevice} />
    </Stack.Navigator>
  </NavigationContainer>
);

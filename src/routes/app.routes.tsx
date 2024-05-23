import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

import Home from "../screens/app/Home";
import Movement from "../screens/app/Movement";
import Summary from "../screens/app/Summary";

const Tab = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Movement" component={Movement} />
        <Tab.Screen name="Summary" component={Summary} />
      </Tab.Navigator>
    </View>
  );
}

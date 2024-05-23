import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import Authentication from "../screens/app/Authentication";

const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen name="Authentication" component={Authentication} />
      </Stack.Navigator>
    </View>
  );
}

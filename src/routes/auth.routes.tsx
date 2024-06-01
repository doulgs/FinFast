import Authentication from "@/screens/app/Authentication";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Authentication" component={Authentication} />
      </Stack.Navigator>
    </View>
  );
}

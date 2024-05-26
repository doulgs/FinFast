import { Icon_Home } from "@/assets/icons/Icon_Home";
import { Icon_Plus } from "@/assets/icons/Icon_Plus";
import { Icon_Receipt } from "@/assets/icons/Icon_Receipt";
import { Box } from "@/components/Box";
import { ThemeProps } from "@/themes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@shopify/restyle";
import { View } from "react-native";

import Home from "@/screens/app/Home";
import Movement from "@/screens/app/Movement";
import Summary from "@/screens/app/Summary";

const Tab = createBottomTabNavigator();

export function AppRoutes() {
  const { colors } = useTheme<ThemeProps>();
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.brand_gradient,
          tabBarInactiveTintColor: colors.brand_secondary,
          tabBarStyle: {
            backgroundColor: colors.brand_background,
            borderTopWidth: 0,
            elevation: 0,
            height: 80,
            paddingHorizontal: 60,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon_Home color={color} size={32} />
            ),
          }}
        />
        <Tab.Screen
          name="Movement"
          component={Movement}
          options={{
            tabBarStyle: { display: "none" },
            tabBarIcon: ({ color, size }) => {
              return (
                <Box
                  width={56}
                  height={56}
                  borderRadius={8}
                  bg="brand_primary"
                  alignItems="center"
                  justifyContent="center"
                  marginTop="n_m"
                >
                  <Icon_Plus size={32} />
                </Box>
              );
            },
          }}
        />
        <Tab.Screen
          name="Summary"
          component={Summary}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon_Receipt color={color} size={32} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

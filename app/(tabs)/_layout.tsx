import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Text, View, StyleSheet } from "react-native";
import { CiCalendar, CiDiscount1 } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import colors from "@/assets/colors/colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    "Lexend-Thin": require("../../assets/fonts/Lexend-Thin.ttf"),
    "Lexend-ExtraLight": require("../../assets/fonts/Lexend-ExtraLight.ttf"),
    "Lexend-Light": require("../../assets/fonts/Lexend-Light.ttf"),
    "Lexend-Regular": require("../../assets/fonts/Lexend-Regular.ttf"),
    "Lexend-Medium": require("../../assets/fonts/Lexend-Medium.ttf"),
    "Lexend-SemiBold": require("../../assets/fonts/Lexend-SemiBold.ttf"),
    "Lexend-Bold": require("../../assets/fonts/Lexend-Bold.ttf"),
    "Lexend-ExtraBold": require("../../assets/fonts/Lexend-ExtraBold.ttf"),
    "Lexend-Black": require("../../assets/fonts/Lexend-Black.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ focused }: any) => (
            <View style={focused ? styles.shadowEffect : null}>
              {focused && <View style={styles.activeBar} />}
              <CiCalendar
                size={32}
                color={focused ? colors.black : colors.btm_nav_unselected}
              />
            </View>
          ),
          tabBarLabel: ({ focused }: any) => (
            <Text
              style={{
                fontFamily: "Lexend-Regular",
                color: focused ? colors.black : colors.btm_nav_unselected,
                fontSize: 12,
              }}
            >
              Events
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="discounts"
        options={{
          title: "Discounts",
          tabBarIcon: ({ focused }: any) => (
            <View style={focused ? styles.shadowEffect : null}>
              {focused && <View style={styles.activeBar} />}
              <CiDiscount1
                size={30}
                color={focused ? colors.black : colors.btm_nav_unselected}
              />
            </View>
          ),
          tabBarLabel: ({ focused }: any) => (
            <Text
              style={{
                fontFamily: "Lexend-Regular",
                color: focused ? colors.black : colors.btm_nav_unselected,
                fontSize: 13,
              }}
            >
              Discounts
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }: any) => (
            <View style={focused ? styles.shadowEffect : null}>
              {focused && <View style={styles.activeBar} />}
              <GoPerson
                size={32}
                color={focused ? colors.black : colors.btm_nav_unselected}
              />
            </View>
          ),
          tabBarLabel: ({ focused }: any) => (
            <Text
              style={{
                fontFamily: "Lexend-Regular",
                color: focused ? colors.black : colors.btm_nav_unselected,
                fontSize: 12,
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  shadowEffect: {
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 50,
    elevation: 10,
    backgroundColor: "rgba(0, 122, 255, 0.17)",
    borderRadius: 50,
    padding: 1,
  },
  activeBar: {
    position: "absolute",
    top: -8,
    left: -3,
    width: "120%",
    height: 8,
    backgroundColor: colors.fitness_tab,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

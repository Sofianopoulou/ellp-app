<<<<<<< HEAD
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (err) {
      console.log("Error @clearOnboarding: ", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link href="/events">
        <Pressable>
          <Text>Go to Events Page</Text>
        </Pressable>
      </Link>
      <Link href="/onboarding">
        <Pressable>
          <Text>Go to Onboarding</Text>
        </Pressable>
      </Link>
      <Link href="/(onboarding)/logopage">
        <Pressable>
          <Text>Go to LogoPage</Text>
        </Pressable>
      </Link>
      <TouchableOpacity onPress={clearOnboarding}>
        <Text>Clear Onboarding</Text>
      </TouchableOpacity>
      <Link href="/profile">
        <Pressable>
          <Text>Go to Profile Page</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
=======
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Button, Linking, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text>ELLP</Text>
        <TouchableOpacity
          className="bg-blue-500 p-2 rounded-lg"
          onPress={() => router.push("/(auth)/sign-in")} 
        >
          <Text className="text-white text-lg">Go to Sign In</Text>
        </TouchableOpacity>
        <Link href="/events">Go to events</Link>
      </View>
    </ThemeProvider>
  );
}
>>>>>>> 7222d7932e54aa48773ce1221cee45ded638fb8e

import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import colors from "@/assets/colors/colors";
import Onboarding from "@/components/Onboarding/Onboarding";

const Loading = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

export default function InitialScreen() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      //console.log("AsyncStorage value for @viewedOnboarding:", value);
      if (value !== null) setViewedOnboarding(true);
    } catch (err) {
      console.log("Error @checkOnboarding:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return loading ? (
    <Loading />
  ) : viewedOnboarding ? (
    <Redirect href="/(tabs)/events" />
  ) : (
    <Onboarding />
  );
}

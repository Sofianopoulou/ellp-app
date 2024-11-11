import { View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import Onboarding from "@/components/Onboarding/Onboarding";
import colors from "@/assets/colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "..";
import Profile from "../screens/profile/Profile";

const Loading = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

const OnboardingPage = () => {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("@viewedOnboarding");
        if (value !== null) setViewedOnboarding(true);
      } catch (err) {
        console.log("Error @checkOnboarding:", err);
      } finally {
        setLoading(false);
      }
    };
    checkOnboarding();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {loading ? <Loading /> : viewedOnboarding ? <Profile /> : <HomeScreen />}
    </View>
  );
};

export default OnboardingPage;

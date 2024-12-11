import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import colors from "@/assets/colors/colors";
import Onboarding from "@/components/Onboarding/Onboarding";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import Loading from "@/components/Loading";

export default function InitialScreen() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkOnboarding = async () => {
    try {
      const onboardingValue = await AsyncStorage.getItem("@viewedOnboarding");
      if (onboardingValue !== null) setViewedOnboarding(true);
    } catch (err) {
      console.log("Error @checkOnboarding:", err);
    } finally {
      setLoading(false);
    }
  };

  // const checkLogin = async () => {
  //   try {
  //     const loginStatus = await AsyncStorage.getItem("@isLoggedIn");
  //     if (loginStatus !== null) setIsLoggedIn(true);
  //   } catch (err) {
  //     console.log("Error @checkLogin:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Check the user's login status using Firebase Authentication
  const checkLogin = async () => {
    const auth = getAuth();
    try {
      // Listen for authentication state changes
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          setIsLoggedIn(true);
        } else {
          // User is not signed in
          setIsLoggedIn(false);
        }
      });
    } catch (err) {
      console.log("Error @checkLogin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      await checkOnboarding();
      await checkLogin();
      setLoading(false);
    };

    initializeApp();
  }, []);

  return loading ? (
    <Loading />
  ) : isLoggedIn ? (
    <Redirect href="/(tabs)/events" />
  ) : viewedOnboarding ? (
    <Redirect href="/(auth)/sign-in" />
  ) : (
    <Onboarding />
  );
}

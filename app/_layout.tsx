import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context"; // Bezpieczny obszar na ekranie

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  content: {
    flex: 1, // Treść wypełnia przestrzeń pomiędzy headerem i footerem
    padding: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
});

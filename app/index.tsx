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

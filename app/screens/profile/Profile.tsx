import MediumButtonComponent from "@/components/MediumButtonComponent";
import { View, Text } from "react-native";
import colors from "@/assets/colors/colors";
import MenuItem from "@/components/MenuItem";

import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/types/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SmallButtonComponent from "@/components/SmallButtonComponent";

import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import CustomAlert from "@/components/CustomAlert";
import { useRouter } from "expo-router";
import FavouriteDiscounts from "./FavouriteDiscounts";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const Profile = () => {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("Logout"); // Default title
  const [alertMessage, setAlertMessage] = useState(
    "Are you sure you want to logout? "
  );
  const router = useRouter(); // Hook to navigate programmatically

  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (err) {
      console.log("Error @clearOnboarding: ", err);
    }
  };

  const handleLogout = () => {
    setAlertVisible(true);
  };

  const handleConfirmLogout = async () => {
    try {
      const auth = getAuth(); // Get Firebase Auth instance
      await signOut(auth); // Sign out the user from Firebase
      console.log("Logged Out");

      // Navigate the user to the login screen
      router.push("/(auth)/sign-in");
    } catch (error) {
      console.log("Error during logout:", error);
    }
    setAlertVisible(false);
  };

  return (
    <View
      style={{
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            backgroundColor: colors.white,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: colors.fitness_tab,
          }}
        >
          <Ionicons name="person-sharp" size={50} />
        </View>
        <View style={{ alignItems: "center", margin: 20 }}>
          <Text style={{ fontFamily: "Lexend-Medium" }}>User Name</Text>
          <Text style={{ fontFamily: "Lexend-Light", color: colors.text }}>
            email@address.com
          </Text>
        </View>

        <MediumButtonComponent
          title="View Membership"
          onPress={() => navigation.navigate("Membership")}
        />

        {/* onboarding testing button */}
        <SmallButtonComponent
          title="Clear Onboarding"
          onPress={clearOnboarding}
          style={{ margin: 10 }}
        />
      </View>

      <View style={{ height: 1, backgroundColor: colors.grey_background }} />

      <MenuItem
        icon={<Feather name="settings" size={24} color={colors.secondary} />}
        text="Settings"
        onPress={() => navigation.navigate("ProfileSettings")}
      />
      <MenuItem
        icon={<Feather name="heart" size={24} color={colors.secondary} />}
        text="Favorites"
        onPress={() => navigation.navigate("FavouriteDiscounts")}
      />

      <View style={{ height: 1, backgroundColor: colors.grey_background }} />

      <MenuItem
        icon={
          <Ionicons name="information" size={24} color={colors.secondary} />
        }
        text="Information"
        onPress={() => navigation.navigate("InfoPage")}
      />
      <View>
        <MenuItem
          icon={<AntDesign name="logout" size={24} color={colors.secondary} />}
          text="Logout"
          textColor={colors.red_text}
          onPress={handleLogout}
          showArrow={false}
        />
        <CustomAlert
          visible={isAlertVisible}
          onClose={() => setAlertVisible(false)}
          onAction={handleConfirmLogout}
          title={alertTitle}
          message={alertMessage}
          actionText="Logout"
        />
      </View>
    </View>
  );
};

export default Profile;

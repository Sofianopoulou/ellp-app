import { View, Text } from "react-native";
import colors from "@/assets/colors/colors";

import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useNavigation } from "@react-navigation/native";
import RootStackParamList from "@/app/types/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SmallButtonComponent from "@/components/SmallButtonComponent";
import MediumButtonComponent from "@/components/MediumButtonComponent";
import MenuItem from "@/components/MenuItem";

import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import CustomAlert from "@/components/CustomAlert";
import { useRouter } from "expo-router";
import { onValue, ref } from "firebase/database";
import { realtimeDb } from "@/firebaseConfig";
import Loading from "@/components/Loading";
import { fetchUserData } from "@/utils/firebaseUtils";
import FavouriteDiscounts from "./FavouriteDiscounts";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const Profile = () => {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userRef = ref(realtimeDb, `users/${currentUser.uid}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
          setLoading(false);
        } else {
          setUserData(null);
          setLoading(false);
        }
      });

      // Clean up listener when the component unmounts
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

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

      router.push("/(auth)/sign-in");
    } catch (error) {
      console.log("Error during logout:", error);
    }
    setAlertVisible(false);
  };

  if (loading) {
    return <Loading />;
  }

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
          <Text style={{ fontFamily: "Lexend-Medium" }}>
            {userData?.name || "Unknown User"}
          </Text>
          <Text style={{ fontFamily: "Lexend-Light", color: colors.text }}>
            {userData?.email || "Unknown Email"}
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
          title="Logout"
          message="Are you sure you want to logout?"
          actionText="Logout"
        />
      </View>
    </View>
  );
};

export default Profile;

import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import colors from "@/assets/colors/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MembershipStatus from "@/components/MembershipStatus";
import { useNavigation } from "@react-navigation/native";
import RootStackParamList from "@/app/types/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";

import { useLayoutEffect } from "react";
import { database } from "@/firebaseConfig";
import { usePreventScreenCapture } from "expo-screen-capture";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const Membership = () => {
  usePreventScreenCapture();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Your membership",
      headerBackButtonDisplayMode: "minimal",
    });
  }, [navigation]);
  const { width, height } = Dimensions.get("window");
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          setUserData(null);
        }
      });

      // Clean up listener when the component unmounts
      return () => unsubscribe();
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          backgroundColor: colors.white,
          flex: 1,
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: colors.white,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: colors.fitness_tab,
            }}
          >
            {userData?.profileImage ? (
              <Image
                source={{ uri: userData.profileImage }}
                style={{ width: "100%", height: "100%", borderRadius: 50 }}
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="person" size={50} color={colors.text} />
            )}
          </View>
          <Text
            style={{ fontFamily: "Lexend-Medium", marginTop: 10, fontSize: 20 }}
          >
            {userData?.name}
          </Text>
          <MembershipStatus
            status={userData?.membership?.membershipStatus || "non-member"}
          />
        </View>

        <View style={{ width: width * 0.8 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text style={{ fontFamily: "Lexend-Regular", color: colors.text }}>
              Membership
            </Text>
            <Text style={{ fontFamily: "Lexend-Light", color: colors.text }}>
              {userData?.membership.hasMembership
                ? "ELLP Membership"
                : "Not a member"}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {userData?.membership.hasMembership ? (
              <>
                <Text
                  style={{ fontFamily: "Lexend-Regular", color: colors.text }}
                >
                  Account Expiry
                </Text>
                <Text
                  style={{ fontFamily: "Lexend-Light", color: colors.text }}
                >
                  {userData?.membership.expiryDate}
                </Text>
              </>
            ) : (
              <Text
                style={{ fontFamily: "Lexend-Regular", color: colors.text }}
              >
                Ready to become a member?{" "}
                <Text
                  onPress={() => navigation.navigate("JoinUs")}
                  style={{
                    color: colors.secondary,
                    fontFamily: "Lexend-Medium",
                  }}
                >
                  Join us here!
                </Text>
              </Text>
            )}
          </View>
        </View>

        <Image
          source={require("../../../assets/images/ellp-card.jpg")}
          style={{
            width: width * 0.9,
            height: height * 0.35,
            borderRadius: 20,
          }}
          resizeMode="cover"
        />

        <Text
          style={{
            fontFamily: "Lexend-Regular",
            color: colors.text,
            fontSize: 14,
            textAlign: "left",
            paddingHorizontal: 20,
          }}
        >
          {userData?.membership.hasMembership
            ? "Simply present this screen to unlock your exclusive discounts at participating locations."
            : "By purchasing an ELLP membership, you'll unlock exclusive discounts to events and local spots, along with the best perks on the island."}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Membership;

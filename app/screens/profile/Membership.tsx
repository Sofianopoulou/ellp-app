import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import colors from "@/assets/colors/colors";
import { IoPerson } from "react-icons/io5";
import MembershipStatus from "@/components/MembershipStatus";
import { User } from "@/app/types/User";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/types/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const Membership = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Your membership",
      headerBackButtonDisplayMode: "minimal",
    });
  }, [navigation]);
  const { width, height } = Dimensions.get("window");

  const user: User = {
    name: "Maria Maria",
    email: "mariamaria@gmail.com",
    phone: "+30 6946272687",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdBuvbsYu7WYAAUY2AqSQRGNESsYdkucDkQ&s",
    membershipStatus: "non-member",
    hasMembership: false,
    dateofPurchase: "28th of August 2024",
    expiryDate: "28th of August 2025",
    lastLogin: "28th of August 2021",
  };

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
            {user.profilePicture ? (
              <Image
                source={{ uri: user.profilePicture }}
                style={{ width: "100%", height: "100%", borderRadius: 50 }}
                resizeMode="cover"
              />
            ) : (
              <IoPerson size={50} />
            )}
          </View>
          <Text style={{ fontFamily: "Lexend-Medium", marginTop: 10 }}>
            {user.name}
          </Text>
          <MembershipStatus status={user.membershipStatus} />
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
              {user.hasMembership ? "ELLP Membership" : "Not a member"}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {user.hasMembership ? (
              <>
                <Text
                  style={{ fontFamily: "Lexend-Regular", color: colors.text }}
                >
                  Account Expiry
                </Text>
                <Text
                  style={{ fontFamily: "Lexend-Light", color: colors.text }}
                >
                  {user.expiryDate}
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
          {user.hasMembership
            ? "Simply present this screen to unlock your exclusive discounts at participating locations."
            : "By purchasing an ELLP membership, you'll unlock exclusive discounts to events and local spots, along with the best perks on the island."}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Membership;

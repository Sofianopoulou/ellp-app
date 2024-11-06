import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import colors from "@/assets/colors/colors";
import { CiCalendar } from "react-icons/ci";
import { VscPercentage } from "react-icons/vsc";
import { MdGroups } from "react-icons/md";
import { Link } from "expo-router";

const JoinUs = () => {
  const { width, height } = Dimensions.get("window");

  return (
    <View
      style={{
        backgroundColor: colors.white,
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
      }}
    >
      <Image
        source={require("../../../assets/images/ellp-card.jpg")}
        style={{
          width: width * 0.9,
          height: height * 0.4,
          alignSelf: "center",
          marginBottom: 20,
          borderRadius: 15,
        }}
        resizeMode="cover"
      />
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text
          style={{
            fontFamily: "Lexend-SemiBold",
            color: colors.text,
            fontSize: 18,
            textAlign: "left",
            marginBottom: 8,
          }}
        >
          Join the{" "}
          <Text style={{ color: colors.secondary }}>ELLP Membership</Text> and
          Get Your Virtual Card Today!
        </Text>
        <Text
          style={{
            color: colors.text,
            fontFamily: "Lexend-Light",
            fontSize: 14,
            textAlign: "left",
          }}
        >
          No wallet, no physical card—just pure convenience. Live the island
          life with exclusive discounts and perks!
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 30,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <CiCalendar size={40} color={colors.secondary} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Lexend-Regular",
              color: colors.secondary,
            }}
          >
            Weekly Events
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <VscPercentage size={40} color={colors.secondary} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Lexend-Regular",
              color: colors.secondary,
            }}
          >
            Discounts
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <MdGroups size={40} color={colors.secondary} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Lexend-Regular",
              color: colors.secondary,
            }}
          >
            Community
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontFamily: "Lexend-SemiBold",
              fontSize: 18,
              color: colors.secondary,
              marginBottom: 5,
            }}
          >
            ELLP Membership
          </Text>
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              fontSize: 18,
              color: colors.text,
            }}
          >
            €11,49
            <Text style={{ fontFamily: "Lexend-Light", fontSize: 16 }}>
              /year
            </Text>
          </Text>
        </View>

        <Link href="/screens/profile/PaymentScreen">
          <TouchableOpacity
            style={{
              backgroundColor: colors.fitness_tab,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 25,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontFamily: "Lexend-Regular",
                fontSize: 16,
              }}
            >
              Buy Now
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default JoinUs;

import MediumButtonComponent from "@/components/MediumButtonComponent";
import { View, Text } from "react-native";
import colors from "@/assets/colors/colors";
import MenuItem from "@/components/MenuItem";
import { Link } from "expo-router";

import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const Profile = () => {
  const onPress = () => {
    console.log("View Membership Pressed");
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
        <Link href="/screens/profile/Membership">
          <MediumButtonComponent title="View Membership" onPress={onPress} />
        </Link>
      </View>

      <View style={{ height: 1, backgroundColor: colors.grey_background }} />

      <MenuItem
        icon={<Feather name="settings" size={24} color={colors.secondary} />}
        text="Settings"
        onPress={() => console.log("Settings pressed")}
      />
      <MenuItem
        icon={<Feather name="heart" size={24} color={colors.secondary} />}
        text="Favorites"
        onPress={() => console.log("Favorites pressed")}
      />

      <View style={{ height: 1, backgroundColor: colors.grey_background }} />

      <MenuItem
        icon={
          <Ionicons name="information" size={24} color={colors.secondary} />
        }
        text="Information"
        onPress={() => console.log("Information pressed")}
      />
      <MenuItem
        icon={<AntDesign name="logout" size={24} color={colors.secondary} />}
        text="Logout"
        textColor={colors.red_text}
        onPress={() => console.log("Logout pressed")}
        showArrow={false}
      />
    </View>
  );
};

export default Profile;

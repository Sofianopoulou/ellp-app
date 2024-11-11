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

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const Profile = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const onPress = () => {
    navigation.navigate("Membership");
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

        <MediumButtonComponent title="View Membership" onPress={onPress} />
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
        onPress={() => console.log("Favorites pressed")}
      />

      <View style={{ height: 1, backgroundColor: colors.grey_background }} />

      <MenuItem
        icon={
          <Ionicons name="information" size={24} color={colors.secondary} />
        }
        text="Information"
        onPress={() => navigation.navigate("InfoPage")}
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

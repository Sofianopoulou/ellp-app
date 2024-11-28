import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/types/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const FavouriteDiscounts = () => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return <Text>favourite</Text>;
};

export default FavouriteDiscounts;

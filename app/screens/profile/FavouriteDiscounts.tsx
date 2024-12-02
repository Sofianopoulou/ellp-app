import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
  FlatList,
} from "react-native";
import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/types/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import images from "@/assets/images";
import DiscountProfileCard from "@/components/DiscountProfileCard";
import { SafeAreaView } from "react-native-safe-area-context";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const FavouriteDiscounts = () => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Your favourite discounts!",
      headerBackButtonDisplayMode: "minimal",
    });
  }, [navigation]);

  const discountProfileData = [
    {
      id: "1",
      imageUrl: images.example_event,
      location: "Las Palmas",
      title: "3RJ SurfTime",
      discount: "10% OFF",
      category: "Fitness",
    },
    {
      id: "2",
      imageUrl: "./assets/images/event-example.jpg",
      location: "Las Palmas",
      title: "Surf School",
      discount: "15% OFF",
      categpry: "Fitness",
    },
    {
      id: "3",
      imageUrl: images.example_event,
      location: "Las Palmas",
      title: "3RJ SurfTime",
      discount: "10% OFF",
      category: "Fitness",
    },
    {
      id: "4",
      imageUrl: images.luwak,
      location: "Las Palmas",
      title: "3RJ SurfTime",
      discount: "10% OFF",
      category: "Fitness",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={discountProfileData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DiscountProfileCard
            imageUrl={item.imageUrl}
            location={item.location}
            title={item.title}
            discount={item.discount}
            onPress={() => {
              console.log(`Navigating to details for ${item.title}`);
            }}
          />
        )}
      />
    </View>
  );
};

export default FavouriteDiscounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
});

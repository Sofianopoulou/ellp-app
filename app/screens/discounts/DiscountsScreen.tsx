import { View, StyleSheet, FlatList, ActivityIndicator, Linking } from "react-native";
import images from "@/assets/images";
import DiscountCard from "@/components/DiscountCard";
import DiscountProfileCard from "@/components/DiscountProfileCard";
import FilteringTabs from "@/components/FilteringTabs";
import { useEffect, useState } from "react";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { firestoreDb } from "@/firebaseConfig";
import { useNavigation } from "expo-router";
import {
  NativeStackNavigationConfig,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack/lib/typescript/commonjs/src/types";
import RootStackParamList from "@/app/types/Navigation";

export interface DiscountData {
  id: string;
  imageUrl: string;
  mapsUrl: string;
  location: string;
  title: string;
  discount: string;
  category: string;
  locationPostalCode: string;
  locationStreet: string;
}

type DiscountsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DiscountsScreen"
>;
const Discounts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [discounts, setDiscounts] = useState<DiscountData[]>([]);

  const navigation = useNavigation<DiscountsScreenNavigationProp>();
  useEffect(() => {
    const discountsCollection = collection(firestoreDb, "discounts");

    const unsubscribe = onSnapshot(
      discountsCollection,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const discountItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as DiscountData[];

        setDiscounts(discountItems);
        setLoading(false); // Data loaded
      },
      (error) => {
        console.error("Error fetching discounts: ", error);
        setLoading(false); // Stop loading even on error
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredData = discounts.filter((discount) => {
    if (selectedCategory === "All") return true;
    return discount.category === selectedCategory;
  });

  const [favorites, setFavorites] = useState<string[]>([]); // List of favorite IDs

  const handleToggleFavorite = (id: string, isFavorite: boolean) => {
    setFavorites((prevFavorites) =>
      isFavorite
        ? [...prevFavorites, id]
        : prevFavorites.filter((favId) => favId !== id)
    );
  };

  const handlePress = (discount: DiscountData) => {
    navigation.navigate("ViewDiscountScreen", { discount });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.filteringSection}>
        <FilteringTabs
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => setSelectedCategory(category)}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DiscountCard
            imageUrl={item.imageUrl}
            location={item.location}
            title={item.title}
            discount={item.discount}
            onPress={() => {
              console.log(`Navigating to details for ${item.title}`);
              handlePress(item);
            }}
            onToggleFavorite={(isFavorite) =>
              handleToggleFavorite(item.id, isFavorite)
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 16,
  },

  filteringSection: {
    height: 105,
  },
});

export default Discounts;

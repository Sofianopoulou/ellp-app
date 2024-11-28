import { View, StyleSheet, FlatList } from "react-native";
import images from "@/assets/images";
import DiscountCard from "@/components/DiscountCard";
import DiscountProfileCard from "@/components/DiscountProfileCard";
import FilteringTabs from "@/components/FilteringTabs";
import { useState } from "react";

const discountData = [
  {
    id: "1",
    imageUrl: images.example_event,
    location: "Las Palmas",
    title: "3RJ SurfTime",
    discount: "10% OFF",
    category: "Adventure",
  },
  {
    id: "2",
    imageUrl: "./assets/images/event-example.jpg",
    location: "Las Palmas",
    title: "Surf School",
    discount: "15% OFF",
    category: "Fitness",
  },
];

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
];

const Discounts = () => {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Function to filter the data based on the selected category
  const filteredData = discountData.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const [favorites, setFavorites] = useState<string[]>([]); // List of favorite IDs

  const handleToggleFavorite = (id: string, isFavorite: boolean) => {
    setFavorites(
      (prevFavorites) =>
        isFavorite
          ? [...prevFavorites, id] // Add to favorites
          : prevFavorites.filter((favId) => favId !== id) // Remove from favorites
    );
  };

  return (
    <View style={styles.container}>
      <FilteringTabs
        selectedCategory={selectedCategory}
        onCategoryChange={(category) => setSelectedCategory(category)}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={discountData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DiscountCard
            imageUrl={item.imageUrl}
            location={item.location}
            title={item.title}
            discount={item.discount}
            onPress={() => {
              console.log(`Navigating to details for ${item.title}`);
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
    padding: 16,
  },
});

export default Discounts;

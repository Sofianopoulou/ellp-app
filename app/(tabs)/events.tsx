import { View, StyleSheet, FlatList } from "react-native";
import React from "react";
import images from "@/assets/images";
import EventCard from "@/components/EventCard";

const discountData = [
  {
    id: "1",
    imageUrl: images.example_event,
    location: "Las Palmas",
    date: "12 Sep, 2024",
    description: "You cannot miss it!",
    title: "Las Palmas Tour",
    discount: "10% OFF",
  },
  {
    id: "2",
    imageUrl: "./assets/images/event-example.jpg",
    location: "Las Palmas",
    date: "12 Sep, 2024",
    description: "You cannot miss it!",
    title: "Tapas Night",
    discount: "15% OFF",
  },
  {
    id: "3",
    imageUrl: "./assets/images/event-example.jpg",
    location: "Las Palmas",
    date: "12 Sep, 2024",
    description: "You cannot miss it!",
    title: "Museum day",
    discount: "15% OFF",
  },
];

const Events = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={discountData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            imageUrl={item.imageUrl}
            location={item.location}
            description={item.description}
            date={item.date}
            title={item.title}
            onPress={() => {
              console.log(`Navigating to details for ${item.title}`);
            }}
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

export default Events;

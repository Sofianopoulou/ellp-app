import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // For the heart and discount icon

const DiscountProfileCard = () => {
  const image = require("../assets/images/event-example.jpg");
  return (
    <View style={styles.card}>
      <Image
        source={image} // Replace with your image URL
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.location}>LOCATION</Text>
        <Text style={styles.title}>3RJ SurfTime</Text>
        <View style={styles.discountRow}>
          <FontAwesome
            name="percent"
            size={16}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.discountText}>10% OFF</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>See more details</Text>
        </TouchableOpacity>
      </View>
      <FontAwesome
        name="heart"
        size={24}
        color="black"
        style={styles.heartIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 120,
    height: "100%",

    borderRadius: 8,
  },
  content: {
    flex: 1,
    paddingLeft: 16,
  },
  location: {
    fontSize: 12,
    color: "#888",
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 4,
  },
  discountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  icon: {
    marginRight: 4,
  },
  discountText: {
    fontSize: 14,
    color: "#555",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  heartIcon: {
    marginLeft: 8,
  },
});

export default DiscountProfileCard;

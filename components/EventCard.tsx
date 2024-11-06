import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type EventCardProps = {
  imageUrl: string;
  date: string;
  location: string;
  title: string;
  description: string;
  onPress: () => void;
};

const EventCard: React.FC<EventCardProps> = ({
  imageUrl,
  date,
  location,
  title,
  description,
  onPress,
}) => {
  const image = require("../assets/images/event-example.jpg");
  return (
    <View style={styles.card}>
      {/* Image Background */}
      <ImageBackground
        source={image}
        style={styles.image}
        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      ></ImageBackground>
      {/* Conent Below */}
      <View style={styles.content}>
        <Text style={styles.date}>
          {date}, {location}
        </Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>View Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    height: 120,
    width: "100%",
    backgroundColor: "#e0e0e0",
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EventCard;

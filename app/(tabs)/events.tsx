import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";

import React, { useState } from "react";
import images from "@/assets/images";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"; // Importing icons from @expo/vector-icons

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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(false);

  const handlePress = (event) => {
    setSelectedEvent(event);
    setModalVisibility(true);
  };

  const closeModal = () => {
    setModalVisibility(false);
    setSelectedEvent(null);
  };

  const image = images.example_event;
  return (
    <View style={styles.container}>
      <FlatList
        data={discountData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            imageUrl={item.imageUrl}
            location={item.location}
            description={item.description}
            date={item.date}
            title={item.title}
            onPress={() => handlePress(item)}
          />
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibility}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <ScrollView contentContainerStyle={styles.modalScrollContent}>
                {/* Event Image */}
                <ImageBackground source={image} style={styles.eventImage} />

                {/* Event Title and Description */}
                <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedEvent.description}
                </Text>

                {/* Event Date and Time */}
                <View style={styles.modalInfo}>
                  <MaterialIcons
                    name="event"
                    size={24}
                    color="#4B9CD3"
                    style={styles.icon}
                  />
                  <View style={styles.infoText}>
                    <Text style={styles.infoMainText}>
                      {selectedEvent.date}
                    </Text>
                    <Text style={styles.infoSubText}>{selectedEvent.time}</Text>
                  </View>
                </View>

                {/* Event Location */}
                <View style={styles.modalInfo}>
                  <MaterialIcons
                    name="location-on"
                    size={24}
                    color="#4B9CD3"
                    style={styles.icon}
                  />
                  <View style={styles.infoText}>
                    <Text style={styles.infoMainText}>
                      {selectedEvent.location}
                    </Text>
                    <Text style={styles.infoSubText}>
                      123 Main Street, NY 10001
                    </Text>
                  </View>
                </View>

                {/* Event Price */}
                <View style={styles.modalInfo}>
                  <MaterialIcons
                    name="euro"
                    size={24}
                    color="#4B9CD3"
                    style={styles.icon}
                  />
                  <View style={styles.infoText}>
                    <Text style={styles.infoMainText}>
                      {selectedEvent.price} TODO
                    </Text>
                  </View>
                </View>

                {/* Evwnt contact info */}
                <View style={styles.modalInfo}>
                  <MaterialIcons
                    name="info"
                    size={24}
                    color="#4B9CD3"
                    style={styles.icon}
                  />
                  <View style={styles.infoText}>
                    <Text style={styles.infoMainText}>
                      Contact us n social media
                    </Text>
                  </View>
                </View>

                {/* Close Button */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    maxHeight: "85%",
  },
  modalScrollContent: {
    alignItems: "center",
    padding: 16,
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  modalInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    flexDirection: "column",
  },
  infoMainText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  infoSubText: {
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    backgroundColor: "#f53b57",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Events;

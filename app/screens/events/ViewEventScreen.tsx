import RootStackParamList from "@/app/types/Navigation";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/native";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

type ViewEventScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ViewEventscreen"
>;
type ViewEventScreenRouteProp = RouteProp<
  RootStackParamList,
  "ViewEventScreen"
>;

interface Props {
  route: ViewEventScreenRouteProp;
  navigation: ViewEventScreenNavigationProp;
}
export default function ViewEventScreen({ route, navigation }: Props) {
  const { event } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={{ uri: event.imageUrl }}
        style={styles.eventImage}
      />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Date: {event.date}</Text>
        <Text style={styles.infoText}>
          Time: {event.startTime} - {event.endTime || "N/A"}
        </Text>
        <Text style={styles.infoText}>Location: {event.location}</Text>
        <Text style={styles.infoText}>
          Price: {event.price} {event.discount && `(${event.discount})`}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeButtonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
  },
  eventImage: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: "#4B9CD3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

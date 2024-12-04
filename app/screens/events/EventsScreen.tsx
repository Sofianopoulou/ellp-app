import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firestoreDb } from "@/firebaseConfig"; // Import Twojej konfiguracji Firebase
import { collection, getDocs } from "firebase/firestore"; // Import funkcji z Firestore
import EventCard from "@/components/EventCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStaticNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "@/app/types/Navigation";

type EventsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EventsScreen"
>;

export interface EventData {
  id: string;
  imageUrl: string;
  location: string;
  date: string;
  description: string;
  title: string;
  startTime: string;
  endTime?: string;
  discount?: string;
  price?: string;
  priceMembers?: string;
  contact?: string;
}

const EventsScreen: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);

  const router = useRouter();
  const navigation = useNavigation<EventsScreenNavigationProp>();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(firestoreDb, "events"); // Pobieramy kolekcję `events`
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsData = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as EventData),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handlePress = (event: EventData) => {
    navigation.navigate("ViewEventScreen", { event });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={events}
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
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default EventsScreen;

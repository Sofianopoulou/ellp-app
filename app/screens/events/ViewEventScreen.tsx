import RootStackParamList from "@/app/types/Navigation";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Linking } from "react-native";
import colors from "@/assets/colors/colors";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useLayoutEffect } from "react";

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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
    });
  }, [navigation]);

  const openWebPage = () => {
    if (event.webPageUrl)
      Linking.openURL(event.webPageUrl).catch((err) =>
        console.error("Failed to open given URL:", err)
      );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Event Image */}
      <ImageBackground
        source={{ uri: event.imageUrl }}
        style={styles.eventImage}
      />
      {/* Event title */}
      <Text style={styles.title}>{event.title}</Text>
      {/* Event description */}
      <Text style={styles.description}>{event.description}</Text>
      {/* Event Date and Time */}
      <View style={styles.rowInfoContainer}>
        <MaterialIcons name="event" size={28} color="#4B9CD3" />
        <View style={styles.infoColumnContainer}>
          <Text style={styles.infoTextMain}>{event.date}</Text>
          <Text style={styles.infoText}>
            {event.startTime}
            {event.endTime ? ` - ${event.endTime}` : ""}
          </Text>
        </View>
      </View>
      {/* Location */}
      <View style={styles.rowInfoContainer}>
        <MaterialIcons name="place" size={28} color="#4B9CD3" />
        <View style={styles.infoColumnContainer}>
          <Text style={styles.infoTextMain}>{event.location}</Text>
          {/* TODO location City + location address */}
        </View>
      </View>
      {/* Price */}
      <View style={styles.rowInfoContainer}>
        <MaterialIcons name="euro" size={28} color="#4B9CD3" />
        <View style={styles.infoColumnContainer}>
          <Text style={styles.infoTextMain}>{event.price} euros</Text>
          <Text style={styles.infoText}>
            {event.priceMembers} euros for members
          </Text>
        </View>
      </View>
      {/* Info and link to webpage */}
      <View style={styles.rowInfoContainer}>
        <MaterialIcons name="info" size={28} color="#4B9CD3" />
        <View style={styles.infoColumnContainer}>
          <Text style={styles.infoTextMain}>
            See the event to buy tickets on our webpage:
            <Text style={styles.linkText} onPress={openWebPage}>
              {" here "}
            </Text>
          </Text>
          <Text style={styles.infoText}>See you there!</Text>
        </View>
      </View>

      {/*  */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 26,
  },
  eventImage: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "400",
    marginBottom: 14,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },

  rowInfoContainer: {
    flexDirection: "row",
    margin: 6,
    alignItems: "center",
  },

  infoColumnContainer: {
    padding: 10,
  },

  infoText: {
    fontSize: 16,
    fontWeight: 300,
  },

  infoTextMain: {
    fontSize: 16,
    fontWeight: 500,
  },

  linkText: {
    color: colors.primary,
    fontWeight: "700",
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

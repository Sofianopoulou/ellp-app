import RootStackParamList from "@/app/types/Navigation";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/native";
import {
  ImageBackground,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import colors from "@/assets/colors/colors";
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

const ViewDiscountScreen = ({ route, navigation }: Props) => {
  const { discount } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
    });
  }, [navigation]);

  const handleOpenMaps = () => {
    Linking.openURL(discount.mapsUrl).catch((err) =>
      console.error("Failed to open maps URL:", err)
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Logo of the collabolator */}
        <ImageBackground style={styles.discountLogo} />
        {/* title */}
        <Text style={styles.title}>{discount.title}</Text>
        {/* Category */}
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{discount.category}</Text>
        </View>
        {/* Location */}
        <View style={styles.rowInfoContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="location-on" size={28} color="#4B9CD3" />
          </View>
          <View style={styles.infoColumnContainer}>
            <Text style={styles.infoTextMain}>{discount.locationCity}</Text>
            <Text style={styles.infoText}>
              {discount.locationStreet}, {discount.locationPostalCode}
            </Text>
          </View>
        </View>

        {/* Discount */}
        <View style={styles.rowInfoContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="percent" size={28} color="#4B9CD3" />
          </View>
          <View style={styles.infoColumnContainer}>
            <Text style={styles.infoTextMain}>{discount.discount}</Text>
            <Text style={styles.infoText}>With the ELLP Membership</Text>
          </View>
        </View>

        {/* Map */}
        <TouchableOpacity
          onPress={handleOpenMaps}
        >
          <View style={styles.rowInfoContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="map" size={28} color="#4B9CD3" />
            </View>
            <View style={styles.infoColumnContainer}>
              <Text style={styles.infoTextMain}>Check where it is!</Text>
              <Text style={styles.infoText}>Open in Maps</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Extra info */}
        <View style={styles.extraInfoContainer}>
          <Text>Don't have a membership card yet?</Text>
          <Text>
            Sign up today and start enjoying these exclusive benefits at our
            partner location!
          </Text>
          <Text style={styles.link}>Join us here!</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewDiscountScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 32,
  },
  discountLogo: {
    width: "60%",
    backgroundColor: "pink",
    height: 130,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 32,
  },
  title: {
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 26,
    marginTop: 28,
  },

  iconContainer: {
    padding: 12,
    backgroundColor: "pink",
    borderRadius: "100%",
  },

  rowInfoContainer: {
    flexDirection: "row",
    alignContent: "center",
    paddingHorizontal: 15,
    paddingLeft: 22,
    paddingVertical: 10,
    gap: 10,
  },

  infoColumnContainer: {
    alignContent: "center",
    justifyContent: "center",
    gap: 3,
  },

  infoTextMain: {
    fontSize: 16,
    fontWeight: 500,
  },

  infoText: {
    fontSize: 16,
    fontWeight: 300,
  },

  categoryContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  category: {
    fontSize: 16,
    paddingTop: 4,
    fontWeight: "500",
    color: colors.primary,
  },

  extraInfoContainer: {
    padding: 22,
  },

  link: {
    color: colors.primary,
    fontWeight: "700",
  },
});

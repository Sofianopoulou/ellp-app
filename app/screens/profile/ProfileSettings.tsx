import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import colors from "@/assets/colors/colors";

import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import LargeButtonComponent from "@/components/LargeButtonComponent";
import { useState } from "react";
import CustomAlert from "@/components/CustomAlert";

const ProfileSettings = () => {
  const [placeholders, setPlaceholders] = useState({
    name: "User Name",
    email: "email@address.com",
    phone: "+92 317 8059484",
    password: "************",
  });

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("Delete Profile"); // Default title
  const [alertMessage, setAlertMessage] = useState(
    "Are you sure you want to delete your profile? This action cannot be undone."
  );

  const handleDeleteProfile = () => {
    setAlertVisible(true);
  };

  const handleConfirmDelete = () => {
    console.log("Profile Deleted");
    setAlertVisible(false);
    // delete logic here
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Ionicons name="person-sharp" size={50} />
            <TouchableOpacity style={styles.editIcon}>
              <AntDesign name="camerao" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputContainer}>
            <Feather name="user" size={18} color={colors.secondary} />
            <TextInput
              placeholder={placeholders.name}
              style={styles.textInput}
              onFocus={() => setPlaceholders((prev) => ({ ...prev, name: "" }))}
              onBlur={() =>
                setPlaceholders((prev) => ({
                  ...prev,
                  name: "User Name",
                }))
              }
            />
          </View>

          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputContainer}>
            <Feather name="mail" size={18} color={colors.secondary} />
            <TextInput
              placeholder={placeholders.email}
              style={styles.textInput}
              onFocus={() =>
                setPlaceholders((prev) => ({ ...prev, email: "" }))
              }
              onBlur={() =>
                setPlaceholders((prev) => ({
                  ...prev,
                  email: "email@address.com",
                }))
              }
            />
          </View>

          <Text style={styles.label}>Phone No</Text>
          <View style={styles.inputContainer}>
            <Feather name="phone" size={18} color={colors.secondary} />
            <TextInput
              placeholder={placeholders.phone}
              style={styles.textInput}
              onFocus={() =>
                setPlaceholders((prev) => ({ ...prev, phone: "" }))
              }
              onBlur={() =>
                setPlaceholders((prev) => ({
                  ...prev,
                  phone: "+92 317 8059484",
                }))
              }
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <Feather name="lock" size={18} color={colors.secondary} />
            <TextInput
              placeholder={placeholders.password}
              style={styles.textInput}
              secureTextEntry
              onFocus={() =>
                setPlaceholders((prev) => ({ ...prev, password: "" }))
              }
              onBlur={() =>
                setPlaceholders((prev) => ({
                  ...prev,
                  password: "************",
                }))
              }
            />
            <Feather name="eye" size={18} color={colors.secondary} />
          </View>
        </View>

        <View style={{ alignItems: "center", paddingTop: 5, paddingBottom: 5 }}>
          <LargeButtonComponent
            title="Edit Profile"
            onPress={() => console.log("Edit Profile Pressed")}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Joined <Text style={styles.boldText}>31 October 2023</Text>
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteProfile}
          >
            <Text style={styles.deleteButtonText}>Delete Profile</Text>
            <CustomAlert
              visible={isAlertVisible}
              onClose={() => setAlertVisible(false)}
              onAction={handleConfirmDelete}
              title={alertTitle}
              message={alertMessage}
              actionText="Delete"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40, // Add bottom padding for extra scroll space
    flexGrow: 1,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.fitness_tab,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.tertiary,
    borderRadius: 12,
    padding: 4,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    color: colors.grey_text,
    fontSize: 12,
    marginBottom: 4,
    fontFamily: "Lexend-Light",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.grey_border,
  },
  textInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: colors.text,
    fontFamily: "Lexend-Light",
    paddingHorizontal: 10,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  footerText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: "Lexend-Light",
  },
  boldText: {
    fontFamily: "Lexend-Regular",
    color: colors.text,
  },
  deleteButton: {
    backgroundColor: colors.red_background,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  deleteButtonText: {
    color: colors.red_text,
    fontSize: 14,
    fontFamily: "Lexend-Regular",
  },
});

export default ProfileSettings;

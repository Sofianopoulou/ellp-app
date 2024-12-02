import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import LargeButtonComponent from "@/components/LargeButtonComponent";
import colors from "@/assets/colors/colors";
import { fetchUserData, updateProfile } from "@/utils/firebaseUtils";
import { getAuth } from "firebase/auth";

interface Props {
  onUpdateProfile: (updatedData: object) => Promise<void>;
  onSuccessAlert: (title: string, message: string) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const ProfileFieldsComponent: React.FC<Props> = ({
  onUpdateProfile,
  onSuccessAlert,
  isEditing,
  setIsEditing,
}) => {
  const [userData, setUserData] = useState<any>(null);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
        console.log("Fetched user data:", data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    loadUserData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error("No user is logged in.");
        onSuccessAlert("Error", "No user is logged in.");
        return;
      }

      const userId = currentUser.uid;

      const updatedData = Object.fromEntries(
        Object.entries(inputs).filter(([, value]) => value.trim() !== "")
      );
      console.log("Updated data:", updatedData);
      if (Object.keys(updatedData).length > 0) {
        // Call updateProfile with the current user's UID and the updated data
        await updateProfile(userId, updatedData);
        onSuccessAlert("Success", "Your profile has been updated.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      onSuccessAlert("Error", "Failed to update profile. Try again later.");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>Full Name</Text>
      <View style={styles.inputContainer}>
        <Feather name="user" size={18} color={colors.secondary} />
        <TextInput
          placeholder={userData?.name || ""}
          editable={isEditing}
          style={styles.textInput}
          value={inputs.name}
          onChangeText={(text) =>
            setInputs((prev) => ({ ...prev, name: text }))
          }
        />
      </View>

      <Text style={styles.label}>E-mail</Text>
      <View style={styles.inputContainer}>
        <Feather name="mail" size={18} color={colors.secondary} />
        <TextInput
          placeholder={userData?.email || ""}
          editable={isEditing}
          style={styles.textInput}
          value={inputs.email}
          onChangeText={(text) =>
            setInputs((prev) => ({ ...prev, email: text }))
          }
        />
      </View>

      <Text style={styles.label}>Phone No</Text>
      <View style={styles.inputContainer}>
        <Feather name="phone" size={18} color={colors.secondary} />
        <TextInput
          placeholder={userData?.phone || ""}
          editable={isEditing}
          style={styles.textInput}
          value={inputs.phone}
          onChangeText={(text) =>
            setInputs((prev) => ({ ...prev, phone: text }))
          }
        />
      </View>

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <Feather name="lock" size={18} color={colors.secondary} />
        <TextInput
          placeholder="************"
          editable={isEditing}
          secureTextEntry
          style={styles.textInput}
          value={inputs.password}
          onChangeText={(text) =>
            setInputs((prev) => ({ ...prev, password: text }))
          }
        />
        <Feather name="eye" size={18} color={colors.secondary} />
      </View>

      <View style={{ alignItems: "center", paddingTop: 25 }}>
        <LargeButtonComponent
          title={isEditing ? "Save Changes" : "Edit Profile"}
          onPress={isEditing ? handleSaveChanges : () => setIsEditing(true)}
        />
        {isEditing && (
          <LargeButtonComponent
            title="Cancel"
            onPress={() => setIsEditing(false)}
            style={{ backgroundColor: colors.red_text, marginTop: 10 }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: { marginBottom: 20 },
  label: { color: colors.grey_text, fontSize: 12, marginBottom: 4 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.grey_border,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    paddingHorizontal: 10,
  },
});

export default ProfileFieldsComponent;

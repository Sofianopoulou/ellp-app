import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "@/assets/colors/colors";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { ref, update, onValue } from "firebase/database";
import { database } from "@/firebaseConfig";

interface Props {
  onSuccessAlert: (title: string, message: string) => void;
  isEditing: boolean;
}

const ProfileImageComponent: React.FC<Props> = ({
  onSuccessAlert,
  isEditing,
}) => {
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileImage = () => {
      const user = getAuth().currentUser;
      if (user) {
        const userRef = ref(database, `users/${user.uid}/profileImage`);
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setProfileImageUri(snapshot.val()); // Load the Base64 or image URL
          }
        });
      }
    };

    fetchProfileImage();
  }, []);

  const handleEditProfilePicture = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        onSuccessAlert(
          "Permission Denied",
          "You need to allow access to your photos."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]?.uri) {
        const imageUri = result.assets[0].uri;
        setProfileImageUri(imageUri);

        // Convert image to Base64 string
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = async () => {
          const base64String = reader.result?.toString();

          if (base64String) {
            const user = getAuth().currentUser;
            if (user) {
              const userId = user.uid;

              // Store the Base64 string in the Realtime Database
              await update(ref(database, `users/${userId}`), {
                profileImage: base64String,
              });

              onSuccessAlert(
                "Success",
                "Profile picture updated successfully!"
              );
            }
          }
        };

        reader.readAsDataURL(blob);
      }
    } catch (error) {
      console.error("Error editing profile picture:", error);
      onSuccessAlert("Error", "Failed to upload profile picture.");
    }
  };

  return (
    <View style={styles.profileImageContainer}>
      <View style={styles.profileImage}>
        {profileImageUri ? (
          <Image
            source={{ uri: profileImageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Ionicons name="person-sharp" size={50} />
        )}
        {isEditing && (
          <TouchableOpacity
            style={styles.editIcon}
            onPress={handleEditProfilePicture}
          >
            <AntDesign name="camerao" size={16} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { width: 80, height: 80, borderRadius: 40 },
  profileImageContainer: { alignItems: "center", marginBottom: 20 },
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
});

export default ProfileImageComponent;

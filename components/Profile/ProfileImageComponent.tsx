import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "@/assets/colors/colors";
import * as ImagePicker from "expo-image-picker";
import { updateProfile, uploadProfileImage } from "@/utils/firebaseUtils";
import { getAuth } from "firebase/auth";
import { ref, set, update } from "firebase/database";
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

  const uriToBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    return await response.blob();
  };

  const handleEditProfilePicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      onSuccessAlert("Permission Denied", "You need to grant photo access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setProfileImageUri(selectedUri); // Update UI with selected image

      try {
        // Upload the image to Firebase Storage
        const downloadURL = await uploadProfileImage(selectedUri);

        // Update the profile in Firebase Realtime Database with the new profile image URL
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
          const userId = currentUser.uid;

          // Update user's profile in Firebase Realtime Database (set the profileimage URL)
          await update(ref(database, `users/${userId}`), {
            profileimage: downloadURL,
          });

          onSuccessAlert("Success", "Profile picture updated successfully.");
        }
      } catch (error) {
        onSuccessAlert("Error", "Failed to upload profile picture.");
      }
    }
  };

  return (
    <View style={styles.profileImageContainer}>
      <View style={styles.profileImage}>
        {profileImageUri ? (
          <Image
            source={{ uri: profileImageUri }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
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

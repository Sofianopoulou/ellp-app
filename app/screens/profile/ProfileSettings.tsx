import { useState } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import colors from "@/assets/colors/colors";
import { auth } from "@/firebaseConfig";

import SimpleAlert from "@/components/SimpleAlert";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import LargeButtonComponent from "@/components/LargeButtonComponent";
import { useLayoutEffect, useState } from "react";
import CustomAlert from "@/components/CustomAlert";
import { useNavigation, useRouter } from "expo-router";

import { auth, realtimeDb } from "@/firebaseConfig";
import { deleteUser } from "firebase/auth";
import { ref, remove } from "firebase/database";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/types/Navigation";
import ProfileImageComponent from "@/components/Profile/ProfileImageComponent";
import DeleteProfileComponent from "@/components/Profile/DeleteProfileComponent";
import ProfileFieldsComponent from "@/components/Profile/ProfileFieldsComponent";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const ProfileSettings = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit profile",
      headerBackButtonDisplayMode: "minimal",
    });
  }, [navigation]);

  const [isEditing, setIsEditing] = useState(false);

  const [simpleAlertVisible, setSimpleAlertVisible] = useState(false);
  const [simpleAlertContent, setSimpleAlertContent] = useState({
    title: "",
    message: "",
  });

  const router = useRouter();

  const handleSuccessAlert = (title: string, message: string) => {
    setSimpleAlertContent({ title, message });
    setSimpleAlertVisible(true);
  };

  const handleProfileUpdate = async (updatedData: object) => {
    // Call Firebase update logic here
    console.log("Updating profile with data:", updatedData);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ProfileImageComponent
          onSuccessAlert={handleSuccessAlert}
          isEditing={isEditing}
        />
        <ProfileFieldsComponent
          onUpdateProfile={handleProfileUpdate}
          onSuccessAlert={handleSuccessAlert}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <DeleteProfileComponent
          auth={auth}
          onDeleteSuccess={() => router.replace("/sign-in")}
          onSuccessAlert={handleSuccessAlert}
          isEditing={isEditing}
        />
        <SimpleAlert
          visible={simpleAlertVisible}
          onClose={() => setSimpleAlertVisible(false)}
          title={simpleAlertContent.title}
          message={simpleAlertContent.message}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scrollContainer: { padding: 20, flexGrow: 1 },
});

export default ProfileSettings;

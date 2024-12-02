import { database } from "@/firebaseConfig";
import { ref, onValue, update } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";

// Function to fetch user data
export const fetchUserData = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject(new Error("No user is currently logged in."));
      return;
    }

    const userId = currentUser.uid;
    const userRef = ref(database, `users/${userId}`);

    onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          reject(new Error("User data not found."));
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
};

// Function to update user profile
export const updateProfile = async (userId: string, data: object) => {
  const userRef = ref(database, `users/${userId}`);

  try {
    await update(userRef, data); // Attempt to update user data
    console.log("Profile updated successfully for user:", userId);
  } catch (error) {
    console.error("Error updating profile:", error); // Log the error if something goes wrong
  }
};

export const uploadProfileImage = async (uri: string): Promise<string> => {
  const storage = getStorage();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No user is currently logged in.");
  }

  const userId = currentUser.uid;
  const imageRef = storageRef(storage, `users/${userId}/profileimage.jpg`); // Custom path

  try {
    console.log("Starting image fetch...");
    const response = await fetch(uri);
    console.log("Image fetched successfully");

    const blob = await response.blob();
    console.log("Blob created successfully");

    console.log("Uploading image...");
    await uploadBytes(imageRef, blob); // Upload image to the custom path
    console.log("Image uploaded successfully");

    const downloadURL = await getDownloadURL(imageRef); // Get the URL of the uploaded image
    console.log("Download URL obtained:", downloadURL);

    return downloadURL; // Return the download URL for storage in the database
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw new Error("Failed to upload profile image");
  }
};

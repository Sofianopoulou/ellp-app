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
  try {
    // Initialize Firebase services
    const auth = getAuth();
    const storage = getStorage();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("No user is currently logged in.");
    }

    // Extract user ID and prepare the storage path
    const userId = currentUser.uid;
    const imageRef = storageRef(storage, `users/${userId}/profileimage.jpg`);

    console.log("Fetching the image from URI:", uri);

    // Convert the URI into a Blob
    const response = await fetch(uri);
    console.log("Fetch response:", response);

    if (!response.ok) {
      throw new Error(`Image fetch failed with status: ${response.status}`);
    }

    const blob = await response.blob();

    console.log("Blob created successfully, uploading...");

    try {
      await uploadBytes(imageRef, blob);
      console.log("Upload successful!");
    } catch (error: any) {
      console.error("Upload error:", error);
      throw new Error(`Failed to upload profile image: ${error.message}`);
    }

    console.log("Image uploaded, getting download URL...");

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(imageRef);
    console.log("Download URL obtained:", downloadURL);

    return downloadURL;
  } catch (error: any) {
    console.error("Error uploading profile image:", error);
    throw new Error(`Failed to upload profile image: ${error.message}`);
  }
};

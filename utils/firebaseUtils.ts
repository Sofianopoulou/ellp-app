import { database } from "@/firebaseConfig";
import { ref, onValue, update } from "firebase/database";
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

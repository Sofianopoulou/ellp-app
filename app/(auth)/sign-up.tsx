import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { auth, database } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, signOut } from "@firebase/auth";
import { ref, set } from "@firebase/database";

import images from "@/assets/images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import SimpleAlert from "@/components/SimpleAlert";
import colors from "@/assets/colors/colors";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState({
    title: "",
    message: "",
  });
  const router = useRouter();

  // Extensive checks for form validation to be added here
  const handleSignUp = async () => {
    // Validate all fields are filled
    if (!form.name || !form.email || !form.password || !form.passwordConfirm) {
      setAlertContent({
        title: "Error",
        message: "All fields are required.",
      });
      setAlertVisible(true);
      return;
    }

    // Validate passwords match
    if (form.password !== form.passwordConfirm) {
      setAlertContent({
        title: "Error",
        message: "Passwords do not match.",
      });
      setAlertVisible(true);
      return;
    }

    // Validate minimum password length
    if (form.password.length < 6) {
      setAlertContent({
        title: "Error",
        message: "Password must be at least 6 characters.",
      });
      setAlertVisible(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Store additional user details in Firebase Realtime Database
      if (userCredential.user) {
        const userId = userCredential.user.uid;
        await set(ref(database, `users/${userId}`), {
          name: form.name,
          email: form.email,
          phone: form.phone,
          profileImage: "",
          membership: {
            membershipStatus: "non-member",
            hasMembership: false,
            expiryDate: "",
          },
          leaderboard: { totalSteps: 0 },
          likedDiscounts: {},
        });

        await signOut(auth);

        setAlertContent({
          title: "Success",
          message:
            "Your account has been created successfully! Log in to start using the app!",
        });
        setAlertVisible(true);

        router.push("/(auth)/sign-in");
      }
    } catch (error: any) {
      // Handle Firebase errors
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        setAlertContent({
          title: "Error",
          message: "This email is already in use.",
        });
      } else if (error.code === "auth/invalid-email") {
        setAlertContent({
          title: "Error",
          message: "Invalid email format.",
        });
      } else if (error.code === "auth/weak-password") {
        setAlertContent({
          title: "Error",
          message: "Password is too weak.",
        });
      } else {
        setAlertContent({
          title: "Error",
          message: "An unexpected error occurred. Please try again.",
        });
      }
      setAlertVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.title}>Sign Up</Text>
          <FormField
            title="Full name"
            placeholder="Full name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles={styles.formField}
          />
          <FormField
            title="Email"
            placeholder="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={styles.formField}
            keyboardType="email-address"
          />
          {/* <FormField
            title="Phone"
            placeholder="Phone"
            value={form.phone}
            handleChangeText={(e) => setForm({ ...form, phone: e })}
            otherStyles={styles.formField}
            keyboardType="phone-pad"
          /> */}
          <FormField
            title="Password"
            placeholder="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.formField}
          />
          <FormField
            title="Confirm Password"
            placeholder="Confirm Password"
            value={form.passwordConfirm}
            handleChangeText={(e) => setForm({ ...form, passwordConfirm: e })}
            otherStyles={styles.formField}
            secureTextEntry
          />
          <CustomButton
            title="Sign Up"
            handlePress={handleSignUp}
            containerStyles={styles.signUpButton}
            isLoading={isSubmitting}
          />
          <View style={styles.signInLinkContainer}>
            <Text style={styles.signInText}>Already have an account?</Text>
            <Link href="/sign-in" style={styles.signInLink}>
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>

      <SimpleAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title={alertContent.title}
        message={alertContent.message}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  formContainer: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logo: {
    width: 115,
    height: 115,
    alignSelf: "center",
  },
  title: {
    fontFamily: "Lexend-SemiBold",
    fontSize: 24,
    textAlign: "center",
    color: colors.black,
    marginTop: 16,
  },
  formField: {
    marginTop: 2,
  },
  signUpButton: {
    marginHorizontal: 12,
    marginTop: 20,
  },
  signInLinkContainer: {
    paddingTop: 12,
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-start",
    marginHorizontal: 12,
  },
  signInText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: "Lexend-Regular",
  },
  signInLink: {
    fontSize: 14,
    fontFamily: "Lexend-Medium",
    color: colors.fitness_tab,
  },
});

export default SignUp;

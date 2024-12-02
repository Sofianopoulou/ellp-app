import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import images from "@/assets/images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import colors from "@/assets/colors/colors";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, form.email, form.password);
      console.log("Sign-in successful!");
      router.push("/(tabs)/events");
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError("Invalid email or password. Please try again.");
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      const auth = getAuth();
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("User already logged in:", user);
          router.push("/(tabs)/events");
        }
      });
    };

    checkUser();
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.formContainer}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.title}>Sign In</Text>

          <FormField
            title="Email"
            placeholder="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            placeholder="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.forgotPasswordContainer}>
            <Link
              href="/(auth)/forgot-password"
              style={styles.forgotPasswordLink}
            >
              Forgot password?
            </Link>
          </View>

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={styles.buttonContainer}
            isLoading={isSubmitting}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <Link href="/(auth)/sign-up" style={styles.signupLink}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  scrollView: {
    paddingBottom: 30,
  },
  formContainer: {
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  logo: {
    width: 115,
    height: 115,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Lexend-SemiBold",
    textAlign: "center",
    marginTop: 16,
  },
  errorText: {
    fontFamily: "Lexend-Light",
    color: colors.red_text,
    textAlign: "center",
    marginTop: 8,
  },
  forgotPasswordContainer: {
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 8,
  },
  forgotPasswordLink: {
    textAlign: "right",
    fontSize: 14,
    color: colors.fitness_tab,
    fontFamily: "Lexend-Regular",
  },
  buttonContainer: {
    marginTop: 30,
    marginHorizontal: 10,
  },
  signupContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-start",
    marginTop: 16,
    marginHorizontal: 10,
  },
  signupText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: "Lexend-Regular",
  },
  signupLink: {
    fontSize: 14,
    color: colors.fitness_tab,
    fontFamily: "Lexend-Medium",
  },
});

export default SignIn;

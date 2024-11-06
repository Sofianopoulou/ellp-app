import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import images from "@/assets/images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = () => {};

  return (
    <SafeAreaView className="bg-cardBg h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[72vh] px-8 py-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[115px] self-center"
          />
          <Text className="text-2xl text-center color-text text-bold mt-4">
            Sign Up
          </Text>
          <FormField
            title="Full name"
            value={form.name}
            handleChangeText={(e: string) => setform({ ...form, name: e })}
            otherStyles="mt-1"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setform({ ...form, email: e })}
            otherStyles="mt-0"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setform({ ...form, password: e })}
            otherStyles="mt-0"
          />
          <FormField
            title="Confirm Password"
            value={form.passwordConfirm}
            handleChangeText={(e: string) => setform({ ...form, passwordConfirm: e })}
            otherStyles="mt-0"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mx-3 mt-12"
            isLoading={isSubmitting}
          />
          <View className="pt-3 flex-row gap-2 justify-start mx-3">
            <Text className="text-base color-text font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-base font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

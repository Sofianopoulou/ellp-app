import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import images from "@/assets/images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setform] = useState({ email: "", password: "" });
  return (
    <SafeAreaView className="bg-cardBg h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[72vh] px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[115px] self-center"
          />
          <Text className="text-2xl text-center color-text text-bold mt-4">
            Sign In
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setform({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setform({ ...form, password: e })}
            otherStyles="mt-3"
          />
          <View className="flex justify-center mx-5">
            <Link
              href="/sign-up"
              className="text-base font-psemibold text-right text-secondary"
            >
              Forgot password?
            </Link>
          </View>

          <CustomButton
            title="Sign In"
            // handlePress={submit}
            containerStyles="mx-3 mt-12"
            // isLoading={isSubmitting}
          />
          <View className="pt-3 flex-row gap-2 justify-start mx-3">
            <Text className="text-base color-text font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-base font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

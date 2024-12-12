import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import DiscountCard from "@/components/DiscountCard";
import DiscountProfileCard from "@/components/DiscountProfileCard";
import FilteringTabs from "@/components/FilteringTabs";
import { useEffect, useState } from "react";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { firestoreDb } from "@/firebaseConfig";
import colors from "@/assets/colors/colors";
import Loading from "@/components/Loading";

interface Discount {
  id: string;
  imageUrl: string;
  location: string;
  title: string;
  discount: string;
  category: string;
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import DiscountsScreen from "../screens/discounts/DiscountsScreen";
import ViewDiscountScreen from "../screens/discounts/ViewDiscountScreen";

const discountsStack = createNativeStackNavigator();

export default function DiscountsStackScreen() {
  return (
    <discountsStack.Navigator>
      <discountsStack.Screen
        name="DiscountsScreen"
        component={DiscountsScreen}
        options={{ headerShown: false }}
      />
      <discountsStack.Screen
        name="ViewDiscountScreen"
        component={ViewDiscountScreen}
      />
    </discountsStack.Navigator>
  );
}

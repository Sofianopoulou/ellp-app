import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiscountsScreen from "../screens/discounts/DiscountsScreen";
import ViewDiscountScreen from "../screens/discounts/ViewDiscountScreen";
import FavouriteDiscounts from "../screens/profile/FavouriteDiscounts";
import RootStackParamList from "../types/Navigation";

const discountsStack = createNativeStackNavigator<RootStackParamList>();

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
        options={{ headerShown: true, headerTitle: "" }}
      />
      <discountsStack.Screen
        name="FavouriteDiscounts"
        component={FavouriteDiscounts}
        options={{ headerShown: true, headerTitle: "" }}
      />
    </discountsStack.Navigator>
  );
}

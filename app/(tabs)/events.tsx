import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventsScreen from "../screens/events/EventsScreen";
import ViewEventScreen from "../screens/events/ViewEventScreen";

const Stack = createNativeStackNavigator();

const EventsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Events"
      component={EventsScreen}
      options={{ title: "Events", headerShown: false }}
    />
    <Stack.Screen
      name="ViewEventScreen"
      component={ViewEventScreen}
      options={{ title: "Event Details" }}
    />
  </Stack.Navigator>
);

export default EventsStack;

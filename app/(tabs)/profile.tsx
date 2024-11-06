// (tabs)/profile.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/profile/Profile";
import Membership from "../screens/profile/Membership";

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Membership" component={Membership} />
    </ProfileStack.Navigator>
  );
}

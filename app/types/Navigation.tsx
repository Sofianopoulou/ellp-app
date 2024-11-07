import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Profile: undefined;
  Membership: undefined;
  JoinUs: undefined;
  PaymentScreen: undefined;
  InfoPage: undefined;
};

export type ProfileScreenProps = StackScreenProps<
  RootStackParamList,
  "Profile"
>;
export type MembershipScreenProps = StackScreenProps<
  RootStackParamList,
  "Membership"
>;
export type JoinUsScreenProps = StackScreenProps<RootStackParamList, "JoinUs">;
export type PaymentScreenProps = StackScreenProps<
  RootStackParamList,
  "PaymentScreen"
>;
export type InfoPageScreenProps = StackScreenProps<
  RootStackParamList,
  "InfoPage"
>;

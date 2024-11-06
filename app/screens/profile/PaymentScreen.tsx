import { View, Text, TouchableOpacity, TextInput } from "react-native";
import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

const PaymentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Pay with Card</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.sectionTitle}>Card Information</Text>
      <TextInput
        style={styles.input}
        placeholder="1234 1234 1234 1234"
        keyboardType="numeric"
      />
      <View style={styles.cardInfoContainer}>
        <TextInput
          style={[styles.input, styles.cardInfoInput]}
          placeholder="MM/YY"
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.cardInfoInput]}
          placeholder="CVC"
          keyboardType="numeric"
        />
      </View>

      <TextInput style={styles.input} placeholder="Full name on card" />

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>PAY</Text>
      </TouchableOpacity>

      <Text style={styles.confirmationText}>
        By confirming your subscription, you allow Erasmus Life Las Palmas to
        charge you for future payments in accordance with their terms. You can
        always cancel your subscription.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
    paddingTop: 60,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Lexend-Medium",
    color: colors.text,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey_border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    color: colors.grey_border,
    fontFamily: "Lexend-Light",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Lexend-Light",
    color: colors.text,
    marginBottom: 8,
  },
  cardInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardInfoInput: {
    flex: 1,
    marginRight: 10,
  },
  payButton: {
    backgroundColor: colors.pay_button,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "Lexend-Medium",
  },
  confirmationText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: "Lexend-Light",
    textAlign: "center",
    marginTop: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
    marginBottom: 15,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
    marginBottom: 15,
  },
});

export default PaymentScreen;

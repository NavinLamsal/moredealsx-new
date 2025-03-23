import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles for the body content
const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    flex: 1,
    alignSelf: "stretch",
  },
  value: {
    fontSize: 12,
    textAlign: "right",
    flex: 1,
    alignSelf: "stretch",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  }
});

const TransactionBody = ({ transaction }: { transaction: any }) => (
  
  <View style={styles.section}>
    <Text style={styles.title}>Payment Successful!</Text>
    
    <View style={styles.row}>
      <Text style={styles.label}>Transaction Date:</Text>
      <Text style={styles.value}>{transaction.transaction_date}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.label}>Detail:</Text>
      <Text style={styles.value}>{transaction.narration}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.label}>Recipient:</Text>
      <Text style={styles.value}>{transaction.receiver_name}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.label}>Sender:</Text>
      <Text style={styles.value}>{transaction.sender_name}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.label}>Paid Amount:</Text>
      <Text style={styles.value}>{transaction.sender_currency_symbol} {transaction.actual_amount}</Text>
    </View>

    {transaction.discount_amount !== undefined && (
      <View style={styles.row}>
        <Text style={styles.label}>Discount Amount:</Text>
        <Text style={styles.value}>{transaction.sender_currency_symbol} {transaction.discount_amount ?? 0.00}</Text>
      </View>
    )}

    <View style={styles.row}>
      <Text style={styles.label}>Total Amount:</Text>
      <Text style={styles.value}>{transaction.sender_currency_symbol} {transaction.receive_amount}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.label}>Remarks:</Text>
      <Text style={styles.value}>{transaction.remarks}</Text>
    </View>

    {transaction?.is_completed  && (
      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{transaction.is_completed ? "Completed": "Incompleted"} </Text>
      </View>
    )}
  </View>
);

export default TransactionBody;

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function City() {
  return (
    <View style={styles.container}>
      <Text>City Page </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

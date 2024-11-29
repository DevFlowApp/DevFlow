import React from "react";
import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function SubmitButton({ onPress }: any) {
  return (
    <Pressable style={styles.buttonSubmit} onPress={onPress}>
      <Text style={styles.buttonText}>Entrar</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonSubmit: {
    backgroundColor: "#0077ff",
    padding: screenWidth < 375 ? 13 : 15,
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

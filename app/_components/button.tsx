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
    paddingHorizontal: 20, 
    paddingVertical: 10,   
    borderRadius: 30,     
    justifyContent: "center",
    alignItems: "center",
    minWidth: 150,        
  },

  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

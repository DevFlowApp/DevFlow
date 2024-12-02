import React, { useState } from "react";
import { Tabs } from "expo-router";
import {
  View,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {


  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#0077ff",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#101010",
            height: 60,
            justifyContent: 'center'
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="person" color={color} />
            ),
          }}
        />
      </Tabs>

    
    </>
  );
}

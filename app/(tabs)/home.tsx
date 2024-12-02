import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderApp from "../_components/headerApp";

const posts = [
  {
    id: "1",
    username: "Nome Usuário",
    handle: "@nomeusuario",
    time: "12h",
    content: "Conteúdo 1",
  },
  {
    id: "2",
    username: "Nome Usuário 2",
    handle: "@nomeusuario2",
    time: "8h",
    content: "Conteúdo 2",
  },
];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");

  const renderItem = ({ item }: any) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.postProfilePic}></View>
        <View>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            {item.username}
          </Text>
          <Text style={{ color: "#0077ff", fontSize: 14 }}>{item.handle}</Text>
        </View>
        <Text style={styles.postTime}>{item.time}</Text>
      </View>
      <Text style={{ color: "#fff", marginTop: 10, marginLeft: 77 }}>
        {item.content}
      </Text>
    </View>
  );

  return (
    <View style={styles.homeSection}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeaderApp />
        <View style={styles.homeContainer}>
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
            Para Você
          </Text>
          <View style={styles.divisor}></View>

          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ marginTop: 50, gap: 20 }}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>

            <Image
              source={{ uri: "https://via.placeholder.com/50" }}
              style={styles.userImage}
            />

            <TouchableOpacity style={styles.publishButton}>
              <Text style={styles.publishButtonText}>Publicar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <TextInput
              style={styles.inputTitle}
              value={title}
              onChangeText={setTitle}
              placeholder="Digite o título"
              placeholderTextColor="#aaa"
              keyboardType="default"
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  homeSection: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  scrollContent: {
    flexGrow: 1,
  },

  homeContainer: {
    padding: 20,
  },

  divisor: {
    backgroundColor: "#0077ff",
    padding: 1.3,
    borderRadius: 15,
    width: 140,
  },

  postCard: {
    backgroundColor: "#101010",
    padding: 25,
    borderRadius: 10,
  },

  postHeader: {
    flexDirection: "row",
    gap: 15,
  },

  postProfilePic: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  postTime: {
    color: "#888",
    fontSize: 16,
    marginLeft: "auto",
  },

  addButton: {
    position: "absolute",
    bottom: 25,
    left: 20,
    backgroundColor: "#0077ff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#101010",
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 30,
    gap: 20,
    backgroundColor: "#101010",
  },

  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  publishButton: {
    backgroundColor: "#0077ff",
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 5,
    marginLeft: "auto",
  },

  publishButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalContent: {
    paddingInline: 30,
    marginTop: 20,
  },
  inputTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
});

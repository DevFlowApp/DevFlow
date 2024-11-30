import React, { useState } from "react";
import { Image, StyleSheet, View, Text, TextInput, Dimensions, Pressable } from "react-native";
import FormHeader from "../_components/formHeader";
import SubmitButton from "../_components/button";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../(tabs)/supabaseClient"; // importando a instância do supabase

const screenWidth = Dimensions.get("window").width;

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !username || !email || !password) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp(
        { email, password },
        { data: { name, username } }
      );

      if (error) {
        throw error;
      }

      alert("Conta criada com sucesso!");
      router.push("/login");
    } catch (error) {
      console.error("Erro ao criar conta:", error.message);
      alert("Erro ao criar conta. Tente novamente.");
    }
  };

  const registerRedirect = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      {/* Ícone de Voltar */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </Pressable>

      <View style={styles.FormContainer}>
        <FormHeader />
        <View style={styles.FormInfos}>
          <View style={styles.inputWrapper}>
            <View style={styles.blueBar} />
            <TextInput
              style={styles.input}
              placeholder="Insira seu nome"
              placeholderTextColor="#555555"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.blueBar} />
            <TextInput
              style={styles.input}
              placeholder="Insira seu nome de usuário"
              placeholderTextColor="#555555"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.blueBar} />
            <TextInput
              style={styles.input}
              placeholder="Insira seu melhor e-mail..."
              placeholderTextColor="#555555"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.blueBar} />
            <TextInput
              style={styles.input}
              placeholder="Crie sua senha..."
              secureTextEntry
              placeholderTextColor="#555555"
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <SubmitButton onPress={handleSubmit} />
        <View style={styles.FormFooter}>
          <Text style={{ color: "#fff", fontSize: 14 }}>
            Já possui uma conta?{" "}
            <Text style={{ color: "#0077ff" }} onPress={registerRedirect}>
              Entrar
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    padding: 30,
    justifyContent: "center",
    backgroundColor: "#0A0A0A",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  FormContainer: {
    flexDirection: "column",
    marginTop: 60, // Ajusta para não sobrepor o botão de voltar
  },
  FormInfos: {
    flexDirection: "column",
    gap: 20,
    marginBottom: 30,
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  blueBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 12,
    backgroundColor: "#0077ff",
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 5,
  },
  input: {
    height: screenWidth < 375 ? 50 : 60,
    backgroundColor: "#101010",
    borderWidth: 0,
    borderRadius: 5,
    paddingLeft: 40,
    fontSize: screenWidth < 375 ? 16 : 18,
    color: "#fff",
  },
  FormFooter: {
    alignItems: "center",
    gap: 20,
    top: 40,
  },
});

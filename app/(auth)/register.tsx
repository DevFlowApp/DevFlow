import React, { useState } from "react";
import { Image, StyleSheet, View, Text, TextInput, Dimensions, Pressable } from "react-native";
import FormHeader from "../_components/formHeader";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../(tabs)/supabaseClient"; 

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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, username } },
      });

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

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      {/* Botão de Voltar */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </Pressable>

      <View style={styles.formContainer}>
        <FormHeader />
        <View style={styles.formInputs}>
          {/** Campos de Input */}
          <InputField
            placeholder="Insira seu nome"
            value={name}
            onChangeText={setName}
          />
          <InputField
            placeholder="Insira seu nome de usuário"
            value={username}
            onChangeText={setUsername}
          />
          <InputField
            placeholder="Insira seu melhor e-mail..."
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            placeholder="Crie sua senha..."
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {/* Botão de Enviar */}
        <SubmitButton onPress={handleSubmit} style={styles.submitButton}>
          Registrar
        </SubmitButton>
        <View style={styles.formFooter}>
          <Text style={styles.footerText}>
            Já possui uma conta?{" "}
            <Text style={styles.loginLink} onPress={redirectToLogin}>
              Entrar
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const InputField = ({ placeholder, secureTextEntry = false, value, onChangeText }) => (
  <View style={styles.inputWrapper}>
    <View style={styles.blueBar} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#555555"
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);


const SubmitButton = ({ onPress, style, children }) => (
  <Pressable onPress={onPress} style={[styles.submitButton, style]}>
    <Text style={styles.submitButtonText}>{children}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  formContainer: {
    flexDirection: "column",
    marginTop: 60,
  },
  formInputs: {
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
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  input: {
    height: screenWidth < 375 ? 50 : 60,
    backgroundColor: "#101010",
    borderRadius: 5,
    paddingLeft: 40,
    fontSize: screenWidth < 375 ? 16 : 18,
    color: "#fff",
  },
  formFooter: {
    alignItems: "center",
    gap: 20,
    top: 40,
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
  },
  loginLink: {
    color: "#0077ff",
  },
  submitButton: {
    backgroundColor: "#0077ff", 
    borderRadius: 25, 
    paddingVertical: 15,
    paddingHorizontal: 40, 
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

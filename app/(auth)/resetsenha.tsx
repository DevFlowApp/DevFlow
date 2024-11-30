import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import { supabase } from "../(tabs)/supabaseClient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw new Error(error.message);

      Alert.alert(
        "Sucesso",
        "Um link para redefinição de senha foi enviado para o seu email.",
        [
          {
            text: "OK",
            onPress: () => router.push("/login"),
          },
        ]
      );
    } catch (error: any) {
      console.error("Erro ao enviar link de redefinição:", error.message);
      Alert.alert("Erro", "Não foi possível enviar o link. Tente novamente.");
    }
  };

  return (
    <ImageBackground
      source={{ uri: "path_to_your_image" }} 
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Logo no topo */}
      <Image
        source={require("../../assets/images/DevFlowLogo.png")} 
        style={styles.logo}
      />

      <Text style={styles.title}>Recupere sua senha</Text>
      <Text style={styles.subtitle}>
        Insira o e-mail associado à sua conta para receber um link de redefinição de senha.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor="#555555"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Enviar e-mail</Text>
      </TouchableOpacity>

      <Text style={styles.link}>
        Lembrou sua senha?{" "}
        <Text style={styles.linkText} onPress={() => router.push("/login")}>
          Volte já!
        </Text>
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0A0A0A", 
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 150, 
    height: 40,  
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#AAA",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: "#101010",
    borderRadius: 30, 
    paddingHorizontal: 100,
    fontSize: 16,
    color: "#FFF",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  button: {
    backgroundColor: "#0077ff",
    paddingHorizontal: 100,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 150,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
  linkText: {
    color: "#0077ff",
  },
});

export default ResetPassword;

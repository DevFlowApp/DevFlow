import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import FormHeader from "../_components/formHeader";
import SubmitButton from "../_components/button";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../(tabs)/supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleRegisterRedirect = () => router.push("/register");

  const toggleCheckbox = () => setRememberMe(!rememberMe);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
       
        throw new Error(error.message);
      }

      alert("Login realizado com sucesso!");
      

      if (rememberMe) {
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);
      }

      router.push("/(tabs)/home"); 
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  const loginWithGitHub = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: "http://localhost:3000/auth/v1/callback",
        },
      });
      if (error) throw new Error(error.message);
      if (data?.url) Linking.openURL(data.url);
    } catch (error) {
      console.error("Erro ao autenticar com GitHub:", error.message);
    }
  };
  

  const loginWithDiscord = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: {
          redirectTo: "https://<project-ref>.supabase.co/auth/v1/callback", 
        },
      });
      if (error) throw new Error(error.message);
      if (data?.url) Linking.openURL(data.url);
    } catch (error) {
      console.error("Erro ao autenticar com Discord:", error.message);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log("Usuário já logado:", session.user);
        router.push("/(tabs)/home");
      }
    };

    const checkRememberMe = async () => {
      const savedEmail = await AsyncStorage.getItem("email");
      const savedPassword = await AsyncStorage.getItem("password");
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    };

    checkSession();
    checkRememberMe();
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.FormContainer}>
        <FormHeader />
        <View style={styles.FormInfos}>
          {/* Campo de email */}
          <View style={styles.inputWrapper}>
            <View style={styles.blueBar} />
            <TextInput
              style={styles.input}
              placeholder="Insira seu email..."
              placeholderTextColor="#555555"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {/* Campo de senha */}
          <View style={styles.inputWrapper}>
            <View style={styles.blueBar} />
            <TextInput
              style={styles.input}
              placeholder="Insira sua senha..."
              secureTextEntry
              placeholderTextColor="#555555"
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {/* Checkbox e opção de esquecimento de senha */}
          <View style={styles.checkboxContainer}>
            <View style={styles.rememberMe}>
              <TouchableOpacity
                onPress={toggleCheckbox}
                style={[styles.checkbox, rememberMe && styles.checkboxSelected]}
              >
                {rememberMe && <Ionicons name="checkmark" size={16} color="#fff" />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Lembrar de mim</Text>
            </View>
            <Pressable onPress={() => router.push("/resetsenha")}>
  <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
</Pressable>


          </View>
          {/* Botão de login */}
          <SubmitButton onPress={handleLogin} />
        </View>

        {/* Opções de login social */}
        <View style={styles.FormFooter}>
          <Text style={{ color: "#fff", fontSize: 14 }}>
            Não possui uma conta?{" "}
            <Text style={{ color: "#0077ff" }} onPress={handleRegisterRedirect}>
              Crie já!
            </Text>
          </Text>
          <View style={[styles.icons, { alignItems: "center", top: 10 }]}>
            <TouchableOpacity onPress={loginWithGitHub}>
              <Ionicons name="logo-github" size={35} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={loginWithDiscord}>
              <Ionicons name="logo-discord" size={35} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    backgroundColor: "#0A0A0A",
  },
  FormContainer: {
    flexDirection: "column",
  },
  FormInfos: {
    flexDirection: "column",
    gap: 20,
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
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  input: {
    height: screenWidth < 375 ? 50 : 60,
    backgroundColor: "#101010",
    borderRadius: 5,
    paddingLeft: 40,
    fontSize: screenWidth < 375 ? 16 : 18,
    color: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#0077ff",
    borderColor: "#0077ff",
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 14,
  },
  forgotPassword: {
    color: "#fff",
    fontSize: 14,
  },
  FormFooter: {
    alignItems: "center",
    gap: 20,
    top: 40,
  },
  icons: {
    gap: 20,
    flexDirection: "row",
  },
});

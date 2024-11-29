import {
  View,
  Text,
  TextInput,
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FormHeader from "../_components/formHeader";
import SubmitButton from "../_components/button";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

const screenWidth = Dimensions.get("window").width;

export default function Login() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const registerRedirect = () => {
    router.push("/register");
  };

  const toggleCheckbox = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <View style={styles.container}>
      <View style={styles.FormContainer}>
        <FormHeader />
        <View style={styles.FormInfos}>
          <View style={styles.inputWrapper}>
            <View style={styles.blueBar} />
            <TextInput
              style={styles.input}
              placeholder="Insira seu email..."
              placeholderTextColor="#555555"
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.blueBar} />
            <TextInput
              style={styles.input}
              placeholder="Insira sua senha..."
              secureTextEntry
              placeholderTextColor="#555555"
            />
          </View>
          <View style={styles.checkboxContainer}>
            <View style={styles.rememberMe}>
              <TouchableOpacity
                onPress={toggleCheckbox}
                style={[
                  styles.checkbox,
                  rememberMe && styles.checkboxSelected,
                ]}
              >
                {rememberMe && (
                  <Ionicons
                    name="checkmark"
                    size={16}
                    color="#fff" 
                  />
                )}
              </TouchableOpacity>

              <Text style={styles.checkboxLabel}>Lembrar de vc</Text>
            </View>
            <Pressable>
              <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
            </Pressable>
          </View>
          <SubmitButton />
        </View>
        <View style={styles.FormFooter}>
          <Text style={{ color: "#fff", fontSize: 14 }}>
            Não possui uma conta?{" "}
            <Text style={{ color: "#0077ff" }} onPress={registerRedirect}>
              Crie já!
            </Text>
          </Text>
          <View style={[styles.icons, { alignItems: "center", top: 10 }]}>
            <Ionicons name="logo-github" size={35} color="#fff" />
            <Ionicons name="logo-google" size={35} color="#fff" />
          </View>
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
    borderWidth: 0,
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

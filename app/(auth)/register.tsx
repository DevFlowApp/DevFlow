import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Pressable,
  Button,
} from "react-native";
import FormHeader from "../_components/formHeader";
import SubmitButton from "../_components/button";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

export default function Login() {
  const router = useRouter();

  const registerRedirect = () => {
    router.push("/login");
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
              placeholder="Insira seu nome"
              placeholderTextColor="#555555"
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.blueBar} />
            <TextInput
              style={styles.input}
              placeholder="Insira seu nome de usuário"
              placeholderTextColor="#555555"
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.blueBar} />
            <TextInput
              style={styles.input}
              placeholder="Insira seu melhor e-mail..."
              placeholderTextColor="#555555"
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.blueBar} />
            <TextInput
              style={styles.input}
              placeholder="Crie sua senha..."
              secureTextEntry
              placeholderTextColor="#555555"
            />
          </View>
        </View>
        <SubmitButton />
        <View style={styles.FormFooter}>
          <Text style={{ color: "#fff", fontSize: 14 }}>
            Não possui uma conta?{" "}
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
  FormContainer: {
    flexDirection: "column",
  },
  FormInfos: {
    flexDirection: "column",
    gap: 20,
    marginBottom: 30
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

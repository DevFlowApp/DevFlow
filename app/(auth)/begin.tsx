import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Button,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import SubmitButton from "../_components/button";

export default function beginScreen() {
  const router = useRouter();

  const loginRedirect = () => {
    router.push("/login");
  };
  const registerRedirect = () => {
    router.push("/register");
  };

  return (
    <View style={styles.beginSection}>
      <View style={styles.beginContainer}>
      <Text style={{ color: "#fff", fontSize: 32, fontWeight: 'bold', textAlign: "center", marginBottom: 30 }}>Sua jornada como dev começa aqui!</Text>
      <SubmitButton onPress={loginRedirect} />
        <Text style={{ color: "#fff", fontSize: 16, textAlign: "center", marginTop: 30 }}>
          Não possui uma conta?{" "}
          <Text style={{ color: "#0077ff" }} onPress={registerRedirect}>
            Crie já!
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  beginSection: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#0A0A0A",

  },
  beginContainer: {
    height: 410,
    padding: 30,
    paddingTop: 60,
    borderTopEndRadius: 70,
    borderTopStartRadius: 70,
    backgroundColor: "#101010",
    flexDirection: "column",
  },
});

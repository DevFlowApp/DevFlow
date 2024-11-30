import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image, 
} from "react-native";
import { useRouter } from "expo-router";
import SubmitButton from "../_components/button";


const backgroundImage = require("../../assets/images/teste.png"); 

const smallImage = require("../../assets/images/DevFlowLogo.png");

export default function BeginScreen() {
  const router = useRouter();

  const loginRedirect = () => {
    router.push("/login");
  };
  const registerRedirect = () => {
    router.push("/register");
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.beginSection}>
      <View style={styles.beginContainer}>
   
        <Image source={smallImage} style={styles.smallImage} />

        <Text style={styles.title}>
          Sua jornada como dev começa aqui!
        </Text>
        <SubmitButton onPress={loginRedirect} />
        <Text style={styles.subtitle}>
          Não possui uma conta?{" "}
          <Text style={styles.link} onPress={registerRedirect}>
            Crie já!
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  beginSection: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover", 
  },
  beginContainer: {
    height: 410,
    padding: 30,
    paddingTop: 60,
    borderTopEndRadius: 70,
    borderTopStartRadius: 70,
    backgroundColor: "rgba(16, 16, 16, 0.8)", 
    flexDirection: "column",
    position: "relative", 
  },
  smallImage: {
    position: "absolute",
    top: -450, 
    right: 20, 
    width: 160, 
    height: 50, 
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
  },
  link: {
    color: "#0077ff",
  },
});

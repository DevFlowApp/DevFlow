import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TextInput,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const DevFlowLogo = require("../../assets/images/DevFlowLogo.png");
const FormHeader = () => {
  return (
    <View style={styles.FormHeader}>
      <Image style={styles.DevFlowLogo} source={DevFlowLogo} />
      <Text style={styles.headerText}>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  FormHeader: {
    flexDirection: "column",
    alignItems: "center",
  },

  DevFlowLogo: {
    width: screenWidth < 375 ? 130 : 180,
    height: 100,
    resizeMode: "contain",
  },

  headerText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 30,
    fontWeight: 700,
    display: "none"
  },
});

export default FormHeader;
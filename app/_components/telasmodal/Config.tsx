import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Importando useRouter para navegação
import { supabase } from "../../(tabs)/supabaseClient";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Configuracoes() {
  const router = useRouter(); // Instanciando useRouter para navegação

  // Função de logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut(); // Realiza o logout
      if (error) throw error;
      Alert.alert("Sucesso", "Você foi deslogado!"); // Exibe uma confirmação
      router.replace("/login"); // Redireciona para a tela de login
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair: " + error.message);
    }
  };

const goBack = () => {
  router.push("/(tabs)/home");
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Configurações</Text>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Pesquisar"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Conteúdo principal */}
      <ScrollView style={styles.content}>
        {/* Seção 1 */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.item}>
            <Feather name="user" size={20} color="white" />
            <Text style={styles.itemText}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Feather name="settings" size={20} color="white" />
            <Text style={styles.itemText}>Configuração de conta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Feather name="bell" size={20} color="white" />
            <Text style={styles.itemText}>Notificações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Feather name="lock" size={20} color="white" />
            <Text style={styles.itemText}>Privacidade</Text>
          </TouchableOpacity>
        </View>

        {/* Seção 2 */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="location-outline" size={20} color="white" />
            <Text style={styles.itemText}>Localização</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <MaterialIcons name="history" size={20} color="white" />
            <Text style={styles.itemText}>Histórico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <FontAwesome5 name="link" size={20} color="white" />
            <Text style={styles.itemText}>Contas vinculadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="eye-outline" size={20} color="white" />
            <Text style={styles.itemText}>Aparência</Text>
          </TouchableOpacity>
        </View>

        {/* Seção 3 */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.item}>
            <Feather name="file-text" size={20} color="white" />
            <Text style={styles.itemText}>Termo de uso</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="white"
            />
            <Text style={styles.itemText}>Sobre</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Feather name="help-circle" size={20} color="white" />
            <Text style={styles.itemText}>Ajuda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={handleLogout}>
            <Icon name="sign-out" size={20} color="#0077ff" />
            <Text style={styles.logout}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    paddingTop: 35,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#101010",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  searchBar: {
    backgroundColor: "#101010",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchInput: {
    backgroundColor: "#333",
    borderRadius: 8,
    color: "#fff",
    paddingHorizontal: 10,
    fontSize: 16,
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  section: {
    backgroundColor: "#111",
    marginBottom: 20,
    borderRadius: 8,
    marginHorizontal: 20,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#222",
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  footer: {
    marginVertical: 20,
    alignItems: "center",
  },
  logout: {
    color: "#0077ff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

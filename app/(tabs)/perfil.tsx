import { StyleSheet, View, TouchableOpacity, TextInput, Text, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const posts = [
  {
    id: "1",
    username: "Nome Usuário",
    handle: "@nomeusuario",
    time: "12h",
    content: "Conteúdo 1",
  },
  {
    id: "2",
    username: "Nome Usuário 2",
    handle: "@nomeusuario2",
    time: "8h",
    content: "Conteúdo 2",
  },
  {
    id: "3",
    username: "Nome Usuário 3",
    handle: "@nomeusuario3",
    time: "2h",
    content: "Conteúdo 3",
  },
];

export default function Perfil() {
  const router = useRouter();

  const renderPost = ({ item } : any) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.postProfilePic}></View>
        <View>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            {item.username}
          </Text>
          <Text style={{ color: "#0077ff", fontSize: 14 }}>
            {item.handle}
          </Text>
        </View>
        <Text style={styles.postTime}>{item.time}</Text>
      </View>
      <Text style={{ color: "#fff", marginTop: 10, marginLeft: 78 }}>
        {item.content}
      </Text>
    </View>
  );

  return (
    <View style={styles.perfilSection}>
      <View style={styles.perfilHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Ionicons
          name="search"
          style={styles.searchIcon}
          size={23}
          color="#fff"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Pesquisar"
          placeholderTextColor="#888"
        />
      </View>

      <ScrollView>
        <View style={styles.perfilLabel}>
          <View style={styles.banner}></View>
          <View style={styles.profilePic}></View>
          <View style={styles.perfilInfos}>
            <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold" }}>
              Nome
            </Text>
            <Text style={{ color: "#0077ff", fontSize: 18 }}>@nomeusuario</Text>
            <Text style={{ color: "#fff", fontSize: 20, marginVertical: 10 }}>
              Descrição
            </Text>
            <View style={styles.followInfo}>
              <Text style={styles.followText}>
                <Text style={styles.followCount}>1000</Text> Seguidores
              </Text>
              <Text style={styles.followText}>
                <Text style={styles.followCount}>1000</Text> Seguindo
              </Text>
            </View>
            <Text style={{ color: "#0077ff", fontSize: 19, marginTop: 25 }}>
              Instituição
            </Text>
            <Text style={{ color: "#fff", fontSize: 13, marginTop: 5 }}>
              Localização
            </Text>
          </View>
        </View>

        <View style={styles.postsSection}>
          <Text
            style={{
              color: "#fff",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Postagens
          </Text>
          <View style={styles.divisor}></View>

          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  perfilSection: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  perfilHeader: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: "#0C0C0C",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  searchIcon: {
    position: "absolute",
    left: "16.2%",
    zIndex: 99,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  textInput: {
    flex: 1,
    height: 40,
    paddingInlineStart: 50,
    backgroundColor: "#1A1A1A",
    borderRadius: 5,
    paddingHorizontal: 15,
    color: "#fff",
    position: "relative",
  },

  perfilLabel: {
    position: "relative",
  },

  banner: {
    padding: 85,
    backgroundColor: "#0077ff",
  },

  profilePic: {
    padding: 85,
    position: "absolute",
    borderRadius: 100,
    marginTop: 80,
    marginLeft: 20,
    backgroundColor: "#000",
  },

  perfilInfos: {
    gap: 5,
    marginTop: 100,
    paddingHorizontal: 30,
  },

  followInfo: {
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
  },

  followText: {
    color: "#fff",
    fontSize: 16,
  },

  followCount: {
    fontWeight: "bold",
    color: "#fff",
  },

  postsSection: {
    marginTop: 60,
    paddingHorizontal: 30,
  },

  divisor: {
    backgroundColor: "#0077ff",
    padding: 1.3,
    borderRadius: 15,
    width: 140,
    marginBottom: 20,
  },

  postCard: {
    backgroundColor: "#101010",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },

  postHeader: {
    flexDirection: "row",
    gap: 15,
  },

  postProfilePic: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  postTime: {
    color: "#888",
    fontSize: 12,
    marginLeft: "auto",
  },
});

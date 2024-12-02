import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderApp from "../_components/headerApp";

const posts = [
  {
    id: "1",
    username: "Nome Usuário",
    handle: "@nomeusuario",
    time: "12h",
    content: "Conteúdo 1",
    isNew: false, 
  },
  {
    id: "2",
    username: "Nome Usuário 2",
    handle: "@nomeusuario2",
    time: "8h",
    content: "Conteúdo 2",
    isNew: true,
  },
  {
    id: "3",
    username: "Nome Usuário 3",
    handle: "@nomeusuario3",
    time: "2h",
    content: "Conteúdo 3",
    isNew: false, 
  },
];

export default function Notificações() {
  return (
    <>
      <HeaderApp />
      <View style={styles.notiSection}>
        <ScrollView>
          <View style={styles.notiContainer}>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.notiCard,
                    item.isNew && styles.notiCardNew,
                  ]}
                >
                  <Text style={styles.notiUsername}>{item.username}</Text>
                  <Text style={styles.notiHandle}>{item.handle}</Text>
                  <Text style={styles.notiTime}>{item.time}</Text>
                  {item.content && <Text style={styles.notiContent}>{item.content}</Text>}
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  notiSection: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  notiContainer: {},

  notiCard: {
    backgroundColor: "#101010",
    padding: 25,
    borderWidth: 1,
    borderColor: "#222",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },

  notiCardNew: {
    backgroundColor: "#202020",
  },

  notiUsername: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  notiHandle: {
    color: "#0077ff",
    fontSize: 14,
    marginTop: 5,
  },

  notiTime: {
    color: "#888",
    fontSize: 12,
    marginTop: 5,
  },

  notiContent: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
});

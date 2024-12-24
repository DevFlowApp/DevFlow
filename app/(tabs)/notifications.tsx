import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";
import { supabase } from "../(tabs)/supabaseClient";
import HeaderApp from "../_components/headerApp";

export default function Notificações() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);

        
        const { data, error } = await supabase
          .from("notifications")
          .select(
            `
            *,
            users:action_user_id (username), 
            target_users:target_id (username)
          `
          )
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Erro ao buscar notificações:", error);
        } else {
          setNotifications(data);
        }
      } catch (error) {
        console.error("Erro inesperado:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const renderNotification = ({ item }) => {
    let notificationMessage = "";

    if (item.notification_type === "like") {
      notificationMessage = `@${item.users.username} curtiu seu post`;
    } else if (item.notification_type === "reply") {
      notificationMessage = `@${item.users.username} respondeu seu post`;
    }

    return (
      <View style={[styles.notiCard, !item.read && styles.notiCardNew]}>
        <Text style={styles.notiUsername}>{notificationMessage}</Text>
        <Text style={styles.notiTime}>
          {new Date(item.created_at).toLocaleString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.notiSection}>
      <HeaderApp />
      <ScrollView>
        <View style={styles.notiContainer}>
          {loading ? (
            <Text style={styles.loadingText}>Carregando...</Text>
          ) : (
            <FlatList
              data={notifications}
              renderItem={renderNotification}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  notiSection: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    paddingTop: 35,
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
    marginBottom: 10,
  },

  notiCardNew: {
    backgroundColor: "#202020",
  },

  notiUsername: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  notiTime: {
    color: "#888",
    fontSize: 12,
    marginTop: 5,
  },

  loadingText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});

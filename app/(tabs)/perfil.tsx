import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Modal,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "react-native-image-picker";
import { supabase } from "../(tabs)/supabaseClient";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale"; // Importação correta do idioma

export default function Perfil() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    description: "", // Adiciona a descrição
  });
  
  const [newName, setNewName] = useState(userData.name);
  const [newUsername, setNewUsername] = useState(userData.username);
  const [newDescription, setNewDescription] = useState(userData.description);
  const [newPassword, setNewPassword] = useState("");
  
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !sessionData?.session?.user) {
        console.error("Erro ao obter sessão do usuário:", sessionError);
        setError("Erro ao obter dados do usuário.");
        return;
      }

      const userId = sessionData.session.user.id;

      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          id,
          content,
          created_at,
          users (
            name,
            username
          )
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar os posts:", error);
        setError("Erro ao buscar posts. Tente novamente mais tarde.");
        return;
      }

      if (!data || data.length === 0) {
        setError("Nenhuma postagem encontrada.");
      } else {
        const transformedPosts = data.map((post) => ({
          id: post.id,
          content: post.content,
          created_at: post.created_at,
          username: post.users?.username || "Usuário",
          name: post.users?.name || "Nome não disponível",
        }));
        setPosts(transformedPosts);
        setError("");
      }
    } catch (err) {
      console.error("Erro inesperado ao buscar posts:", err);
      setError("Erro inesperado ao buscar posts. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          console.error("Erro ao obter sessão do usuário:", sessionError);
          setError("Erro ao obter dados do usuário.");
          return;
        }

        const user = sessionData?.session?.user;

        if (!user) {
          console.error("Usuário não está logado.");
          setError("Você precisa estar logado para acessar esta página.");
          return;
        }

        const { data, error } = await supabase
          .from("users")
          .select("name, username, email")
          .eq("id", user.id);

        if (error) {
          console.error("Erro ao buscar dados do usuário logado:", error);
          setError("Erro ao carregar dados do usuário.");
        } else if (data && data.length > 0) {
          setUserData({
            name: data[0].name,
            username: data[0].username,
            email: data[0].email,
            description: data[0].description,
          });
          setError("");
        } else {
          setError("Usuário não encontrado.");
        }
      } catch (err) {
        console.error("Erro inesperado ao carregar dados do usuário:", err);
        setError("Erro inesperado ao carregar dados do usuário.");
      }
    };

    loadUserData();
  }, []);

  const renderPost = ({ item }) => {
    // Calcula a diferença de tempo em milissegundos
    const timeDifference = Date.now() - new Date(item.created_at).getTime();

    return (
      <View style={styles.postCard}>
        {/* Cabeçalho do post */}
        <View style={styles.postHeader}>
          <View style={styles.postProfilePic}></View>
          <View>
            {/* Nome do usuário */}
            <Text style={styles.username}>
              {item.name || "Usuário Desconhecido"}
            </Text>
            {/* Handle do usuário */}
            <Text style={styles.userHandle}>
              @{item.username || "username"}
            </Text>
          </View>
          {/* Tempo relativo com verificação para "agora" */}
          <Text style={styles.time}>
            {timeDifference < 60000 // Menos de 1 minuto
              ? "agora"
              : formatDistanceToNow(new Date(item.created_at), {
                  addSuffix: true, // Adiciona "há"
                  locale: ptBR, // Idioma português
                })}
          </Text>
        </View>

        {/* Conteúdo do post */}
        <Text style={{ color: "#fff", marginLeft: 50 }}>
          {item.content.length > 250
            ? item.content.substring(0, 200) + "..."
            : item.content}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.perfilSection}>
      <View style={styles.divisor}></View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.banner}>
          <Ionicons
            name="pencil"
            size={20}
            color="#fff"
            style={styles.editIconBanner}
          />
        </View>

        {/* Foto de Perfil */}
        <View style={styles.profilePic}>
          <Ionicons
            name="pencil"
            size={18}
            color="#fff"
            style={styles.editIconProfile}
          />
        </View>

        {/* Informações do Perfil */}
        <View style={styles.perfilInfos}>
          <Text style={styles.username}>{userData.name || "Nome"}</Text>
          <Text style={styles.userHandle}>
            @{userData.username || "nomeusuario"}
          </Text>
          <Text style={styles.description}>{userData.description}</Text>
          <Text style={styles.location}>Localização: {userData.location}</Text>
          <Text style={styles.institution}>
            Instituição: {userData.institution}
          </Text>
          <View style={styles.followInfo}>
            <Text style={styles.followText}>
              <Text style={styles.followCount}>1000</Text> Seguidores
            </Text>
            <Text style={styles.followText}>
              <Text style={styles.followCount}>1000</Text> Seguindo
            </Text>
          </View>
        </View>

        {/* Botão Editar Perfil */}
        <View style={styles.editButtonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setModalVisible(true)} // Abre o modal ao clicar
          >
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Modal para editar perfil */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              padding: 20,
              flex: 1,
              backgroundColor: "#101010",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                backgroundColor: "transparent",
                padding: 10,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#fff",
                marginBottom: 20,
              }}
            >
              Editar Perfil
            </Text>

            <TextInput
              style={{
                height: 50,
                borderColor: "#202020",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 15,
                marginBottom: 15,
                backgroundColor: "#101010",
                color: "#fff",
              }}
              placeholder="Nome"
              placeholderTextColor="#fff"
            />

            <TextInput
              style={{
                height: 50,
                borderColor: "#202020",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 15,
                marginBottom: 15,
                backgroundColor: "#101010",
                color: "#fff",
              }}
              placeholder="Username"
              placeholderTextColor="#fff"
            />

            <TextInput
              style={{
                height: 50,
                borderColor: "#202020",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 15,
                marginBottom: 15,
                backgroundColor: "#101010",
                color: "#fff",
              }}
              placeholder="Descrição"
              placeholderTextColor="#fff"
            />

            <TextInput
              style={{
                height: 50,
                borderColor: "#202020",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 15,
                marginBottom: 20,
                backgroundColor: "#101010",
                color: "#fff",
              }}
              placeholder="Nova Senha"
              secureTextEntry
              placeholderTextColor="#fff"
            />

            <TouchableOpacity
              style={{
                backgroundColor: "#0077ff",
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                Salvar Alterações
              </Text>
            </TouchableOpacity>

            {error ? (
              <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
            ) : null}
          </View>
        </Modal>

        {/* Título "Para Você" */}
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
            paddingLeft: 20,
            paddingTop: 50,
          }}
        >
          Postagens
        </Text>
        <View style={styles.divisor}></View>

        {/* Posts */}
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.postsSection}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  perfilSection: {
    flex: 1,
    backgroundColor: "#101010",
    paddingTop: 35,
  },
  banner: {
    height: 120,
    backgroundColor: "#3C3C3C",
  },
  divisor: {
    backgroundColor: "#0077ff",
    padding: 1.3,
    top: 10,
    borderRadius: 15,
    width: 100,
    left: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: "absolute",
    top: 90,
    left: 15,
    backgroundColor: "#000",
    borderWidth: 3,
    borderColor: "#0077ff",
  },
  perfilInfos: {
    marginTop: 70,
    paddingHorizontal: 15,
  },
  username: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  userHandle: {
    color: "#0077ff",
    fontSize: 16,
    marginTop: 5,
  },
  description: {
    color: "#888",
    fontSize: 14,
    marginTop: 5,
  },
  location: {
    color: "#888",
    fontSize: 14,
    marginTop: 5,
  },
  institution: {
    color: "#888",
    fontSize: 14,
    marginTop: 5,
  },
  followInfo: {
    flexDirection: "row",
    gap: 20,
    marginTop: 15,
  },
  followText: {
    color: "#888",
    fontSize: 14,
  },
  followCount: {
    fontWeight: "bold",
    color: "#fff",
  },
  postsSection: {
    marginTop: 30,
    paddingHorizontal: 15,
  },
  postCard: {
    backgroundColor: "#101010",
    paddingVertical: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Coloca o conteúdo nas extremidades
    width: "100%", // Garante que o header ocupe toda a largura
  },
  postProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333",
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  time: {
    color: "#657786", // Cor similar ao Twitter
    fontSize: 12,
    textAlign: "right", // Alinha o texto à direita
    flex: 1, // Faz o tempo ocupar o espaço disponível e ir para a extremidade direita
    bottom: 23,
  },

  content: {
    color: "#fff",
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  editIconBanner: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#000",
    padding: 5,
    borderRadius: 10,
  },
  editIconProfile: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0077ff",
    padding: 4,
    borderRadius: 10,
  },

  editButtonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  editButton: {
    backgroundColor: "#0077ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 110,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#101010",
  },
  modalText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#0077ff",
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

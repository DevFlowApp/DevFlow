import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  FlatList,
  ScrollView,
  TextInput,
  Pressable,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../(tabs)/supabaseClient";
import DevFlowLogo from "../../assets/images/DevFlowLogo.png";
import { useRouter } from "expo-router";

const router = useRouter();

const navColaborator = () => {
  router.push("/_components/telasmodal/SejaColaborador");
};

const navDevCode = () => {
  router.push("/_components/telasmodal/DevCode");
};

const navConfig = () => {
  router.push("/_components/telasmodal/Config");
};

const navEditarperfil = () => {
  router.push("/_components/telasmodal/editperfil");
};

const navGrupos = () => {
  router.push("/_components/telasmodal/Grupos");
};

const navMeurank = () => {
  router.push("/_components/telasmodal/meurank");
};

const navPostsave = () => {
  router.push("/_components/telasmodal/Postsave");
};
const navSaveCourse = () => {
  router.push("/_components/telasmodal/SaveCourses");
};

const HeaderApp = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messagesState, setMessagesState] = useState([]);
  const [chatHistory, setChatHistory] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Função para buscar usuários do Supabase
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, name, username");

      if (error) {
        console.error("Erro ao buscar usuários:", error.message);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Função para buscar o usuário logado
    const fetchCurrentUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Erro ao buscar o usuário logado:", error.message);
        return;
      }

      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("username, name")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error(
            "Erro ao buscar o perfil do usuário logado:",
            profileError.message
          );
        } else {
          setCurrentUser(profile);
        }
      }
    };

    fetchCurrentUser();
  }, []);

  const openChat = (user) => {
    setSelectedChat(user);
    setMessagesState(chatHistory[user.username] || []);
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const { data, error } = await supabase.from("messages").insert([
        {
          sender_id: supabase.auth.user().id,
          receiver_id: selectedChat.id,
          content: newMessage,
        },
      ]);

      if (error) {
        console.error("Erro ao enviar mensagem:", error.message);
      } else {
        const newMsg = {
          id: data[0].id,
          user: "Você",
          message: newMessage,
        };

        setMessagesState((prev) => [...prev, newMsg]);
        setChatHistory((prev) => ({
          ...prev,
          [selectedChat.username]: [
            ...(prev[selectedChat.username] || []),
            newMsg,
          ],
        }));
        setNewMessage("");
      }
    }
  };

  const closeChat = () => {
    setSelectedChat(null);
    setMessagesState([]);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedChat(null);
    setMessagesState([]);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.headerContainer}>
      <Image source={DevFlowLogo} style={styles.logo} resizeMode="contain" />
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profilePic}
          onPress={() => setSidebarVisible(true)}
        ></TouchableOpacity>
      </View>

      {/* Sidebar */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={sidebarVisible}
        onRequestClose={() => setSidebarVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setSidebarVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.sidebarContainer}>
                <View style={styles.sidebarHeader}>
                  <View style={styles.profileInfo}>
                    <View style={styles.profileImage} />
                    <View>
                      <Text style={styles.username}>
                        {currentUser?.name || "Carregando..."}
                      </Text>
                      <Text style={styles.usernameblue}>
                        @{currentUser?.username || "..."}
                      </Text>
                      <Text style={styles.userRank}>*Rank*</Text>
                    </View>
                  </View>
                  <View style={styles.followInfo}>
                    <Text style={styles.followText}>
                      <Text style={styles.bold}>1000</Text> Seguidores
                    </Text>
                    <Text style={styles.followText}>
                      <Text style={styles.bold}>1000</Text> Seguindo
                    </Text>
                  </View>
                </View>

                <View style={styles.sidebarOptions}>
                  <Text style={styles.sidebarOption}>Editar Perfil</Text>
                  <Pressable onPress={navDevCode}>
                    <Text style={styles.sidebarOption}>DevCode</Text>
                  </Pressable>
                  <Pressable onPress={navPostsave}>
                    <Text style={styles.sidebarOption}>Postagens Salvas</Text>
                  </Pressable>
                  <Pressable>
                    <Text style={styles.sidebarOption}>Cursos Salvos</Text>
                  </Pressable>
                  <Pressable onPress={navMeurank}>
                    <Text style={styles.sidebarOption}>Meu Ranque</Text>
                  </Pressable>
                  <Pressable onPress={navGrupos}>
                    <Text style={styles.sidebarOption}>Grupos</Text>
                  </Pressable>
                  <Pressable onPress={navConfig}>
                    <Text style={styles.sidebarOption}>Configurações</Text>
                  </Pressable>
                  <Pressable onPress={navColaborator}>
                    <Text style={styles.sidebarOption}>Seja Colaborador</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Mensagens Diretas */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View style={styles.chatHeader}>
                  <Text style={styles.modalTitle}>Mensagens Diretas</Text>
                  <TouchableOpacity
                    style={{ marginLeft: "auto" }}
                    onPress={closeModal}
                  >
                    <Ionicons name="close" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={styles.searchInput}
                  placeholder="Pesquisar"
                  placeholderTextColor="#888"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
                <FlatList
                  data={filteredUsers}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.chatItem}
                      onPress={() =>
                        openChat({ name: item.name, username: item.username })
                      }
                    >
                      <View style={styles.chatUserContainer}>
                        <View style={styles.profilePicContainer}></View>
                        <Text style={styles.chatUser}>{item.name}</Text>
                        <Text style={styles.userHandle}>{item.username}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {selectedChat && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={closeChat}
        >
          <TouchableWithoutFeedback onPress={closeChat}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <View style={styles.chatHeader}>
                    <TouchableOpacity
                      style={styles.backButton}
                      onPress={closeChat}
                    >
                      <Ionicons name="arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>
                        {selectedChat.name}
                        <Text style={styles.userHandle}>
                          {selectedChat.username}
                        </Text>
                      </Text>
                    </View>
                  </View>

                  <ScrollView contentContainerStyle={{ marginTop: 10 }}>
                    <FlatList
                      data={messagesState}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <View
                          style={[
                            styles.messageContainer,
                            item.user === "Você"
                              ? styles.sentMessage
                              : styles.receivedMessage,
                          ]}
                        >
                          <Text style={styles.messageUser}>{item.user}</Text>
                          <Text style={styles.messageText}>{item.message}</Text>
                        </View>
                      )}
                    />
                  </ScrollView>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Digite sua mensagem..."
                      placeholderTextColor="#888"
                      value={newMessage}
                      onChangeText={setNewMessage}
                    />
                    <TouchableOpacity
                      style={styles.sendButton}
                      onPress={sendMessage}
                    >
                      <Ionicons name="send" size={24} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilização permanece a mesma do código original
  headerContainer: {
    width: "100%",
    height: 80,
    backgroundColor: "#0C0C0C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: "80%",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  sidebarContainer: {
    backgroundColor: "#101010",
    width: "75%",
    height: "100%",
    position: "absolute",
    right: 0,
    top: 0,
    borderLeftWidth: 1,
    borderColor: "#0077ff",
    padding: 35,
    alignItems: "flex-end", // Alinha todo o conteúdo à direita
  },
  sidebarHeader: {
    marginBottom: 50,
    gap: 20,
    alignItems: "flex-end", // Alinha o conteúdo do cabeçalho à direita
    width: "100%",
  },
  profileInfo: {
    flexDirection: "row-reverse", // Inverte a ordem para que a imagem fique à direita
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    backgroundColor: "#333",
    borderRadius: 50,
    marginLeft: 20, // Espaçamento à esquerda da imagem
  },
  username: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    right: 10,
    textAlign: "right", // Alinha o texto à direita
  },
  usernameblue: {
    color: "#0077ff",
    fontSize: 14,
    right: 10,
    textAlign: "right", // Alinha o texto à direita
  },
  userRank: {
    color: "#aaa",
    fontSize: 16,
    right: 10,
    top: 5,
    fontStyle: "italic",
    textAlign: "right", // Alinha o texto à direita
  },
  followInfo: {
    flexDirection: "row-reverse", // Inverte a ordem dos itens para ficarem à direita
    justifyContent: "flex-end", // Garante que os itens não se espalhem e fiquem à direita
    gap: 10, // Espaçamento horizontal entre os itens
  },
  followText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "right", // Alinha o texto à direita
  },
  bold: {
    fontWeight: "bold",
  },
  sidebarOptions: {
    flex: 1,
    width: "100%",
    gap: 10,
    alignItems: "flex-end", // Alinha as opções à direita
  },
  sidebarOption: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "right", // Garante que cada opção de texto esteja alinhada à direita
  },

  iconButton: {
    marginLeft: 20,
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 50,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    backgroundColor: "#101010",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
    height: "90%",
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  userInfo: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  userName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  userHandle: {
    color: "#0077ff",
    fontSize: 18,
    fontWeight: "normal",
    left: 10,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#202020",
    color: "#fff",
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  chatItem: {
    backgroundColor: "#202020",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  chatUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profilePicContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#555",
    borderRadius: 50,
  },
  chatUser: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  messageContainer: {
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    maxWidth: "70%",
  },
  receivedMessage: {
    backgroundColor: "#202020",
    alignSelf: "flex-start",
  },
  sentMessage: {
    backgroundColor: "#0077ff",
    alignSelf: "flex-end",
  },
  messageUser: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 5,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#fff",
  },
});

export default HeaderApp;

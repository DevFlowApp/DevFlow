import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../(tabs)/supabaseClient";
import HeaderApp from "../_components/headerApp";
import { useRouter } from "expo-router";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function HomeScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [viewPostModalVisible, setViewPostModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const [replyTo, setReplyTo] = useState(null);
  const [isReply, setIsReply] = useState(false);
  const [mention, setMention] = useState("");

  const [visibleReplies, setVisibleReplies] = useState(2);
  const [showAllReplies, setShowAllReplies] = useState(false); 

  
  const fetchComments = async (postId) => {
    if (!postId) {
      console.error("Post ID inválido.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("comments")
        .select("id, content, parent_id, created_at, users(id, name, username)")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Erro ao buscar os comentários:", error);
      } else {
        setComments(data); // Salva todos os comentários, com ou sem respostas
      }
    } catch (error) {
      console.error("Erro ao buscar os comentários:", error);
    }
  };

  const renderComments = (commentList, parentId = null) => {
    return commentList
      .filter((comment) => comment.parent_id === parentId) // Filtra os comentários ou respostas com base no parent_id
      .map((item) => (
        <View key={item.id} style={styles.replyCard}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={styles.profilePicComment}></View>
            <Text style={styles.commentAuthor}>
              {item.users?.name || "Usuário Desconhecido"}
            </Text>
            <Text
              style={{ color: "#0077ff", fontWeight: "bold", fontSize: 14 }}
            >
              @{item.users?.username || "username"}
            </Text>
          </View>

          <Text style={styles.commentContent}>{item.content}</Text>

          {/* Botão de Responder */}
          <TouchableOpacity
            onPress={() => {
              setNewComment(`@${item.users?.username} `); // Menciona o usuário
              setReplyTo(item.id); // Define o ID do comentário respondido
            }}
          >
            <Text style={{ color: "#0077ff", marginTop: 5 }}>Responder</Text>
          </TouchableOpacity>

          {/* Renderiza as respostas ao comentário */}
          <View style={{ marginLeft: 20 }}>
            {renderComments(commentList, item.id)}{" "}
            {/* Chama recursivamente para renderizar respostas */}
          </View>
        </View>
      ));
  };

  // Função para adicionar um comentário
  const addComment = async () => {
    if (newComment.trim()) {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;

        if (!user) {
          alert("Você precisa estar logado para comentar.");
          return;
        }

        const { error } = await supabase.from("comments").insert([
          {
            content: newComment,
            user_id: user.id,
            post_id: selectedPost.id,
            parent_id: isReply ? replyTo : null, // Se for uma resposta, passamos o ID do comentário pai, caso contrário, é null
          },
        ]);

        if (!error) {
          setNewComment("");
          setReplyTo(null); // Reseta o estado de resposta
          setIsReply(false); // Reseta o estado de resposta
          fetchComments(selectedPost.id); // Atualiza os comentários
        }
      } catch (error) {
        console.error("Erro ao adicionar o comentário:", error);
      }
    } else {
      alert("O comentário não pode estar vazio.");
    }
  };

  // Carregar os comentários do post selecionado quando o modal for aberto
  useEffect(() => {
    if (selectedPost) {
      fetchComments(selectedPost.id);
    }
  }, [selectedPost]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("id, content, created_at, users(id, name, username)")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar os posts:", error);
      } else {
        setPosts(data);
      }
    } catch (error) {
      console.error("Erro ao buscar os posts:", error);
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

  const addPost = async () => {
    if (newPostContent.trim()) {
      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError) {
          console.error("Erro ao obter o usuário:", userError);
          alert("Erro ao identificar o usuário. Faça login novamente.");
          return;
        }

        const user = userData?.user;
        if (!user) {
          alert("Você precisa estar logado para publicar um post.");
          return;
        }

        const { data, error } = await supabase
          .from("posts")
          .insert([{ content: newPostContent, user_id: user.id }])
          .select();

        if (error) {
          console.error("Erro ao salvar o post:", error);
          alert("Erro ao salvar o post. Tente novamente.");
        } else {
          console.log("Post adicionado com sucesso:", data);
          setNewPostContent("");
          setModalVisible(false);
          onRefresh();
        }
      } catch (error) {
        console.error("Erro ao adicionar o post:", error);
        alert("Erro ao publicar o post. Tente novamente.");
      }
    } else {
      alert("O post não pode estar vazio.");
    }
  };

  

  const handleLike = async (postId, currentLikes, userId) => {
    try {
      // Verifica se o usuário já curtiu o post
      const { data: post } = await supabase
        .from("posts")
        .select("likes")
        .eq("id", postId)
        .single(); // Obtém o post único
  
      if (post.likes.includes(userId)) {
        // O usuário já curtiu o post
        alert("Você já curtiu este post.");
        return;
      }
  
      // Adiciona o ID do usuário ao array de likes
      const { error } = await supabase
        .from("posts")
        .update({
          likes: [...post.likes, userId], // Adiciona o ID do usuário
        })
        .eq("id", postId);
  
      if (error) {
        console.error("Erro ao adicionar like:", error);
      } else {
        // Atualiza a lista de posts na interface
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: [...post.likes, userId] } : post
          )
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar like:", error);
    }
  };
  
  
  // Função para atualizar os salvamentos no banco
  const handleSave = async (postId, currentSaves, userId) => {
    try {
      // Verifica se o usuário já salvou o post
      const { data: post } = await supabase
        .from("posts")
        .select("saves")
        .eq("id", postId)
        .single(); // Obtém o post único
  
      if (post.saves.includes(userId)) {
        // O usuário já salvou o post
        alert("Você já salvou este post.");
        return;
      }
  
      // Adiciona o ID do usuário ao array de saves
      const { error } = await supabase
        .from("posts")
        .update({
          saves: [...post.saves, userId], // Adiciona o ID do usuário
        })
        .eq("id", postId);
  
      if (error) {
        console.error("Erro ao adicionar save:", error);
      } else {
        // Atualiza a lista de posts na interface
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, saves: [...post.saves, userId] } : post
          )
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar save:", error);
    }
  };

  
  const renderItem = ({ item }) => {
    // Garantir que likes e saves têm um valor válido, caso contrário, inicializa com 0
    const currentLikes = item.likes || 0;
    const currentSave = item.saves || 0; // Corrigir para `saves` em vez de `save`
  
    // Calcula a diferença de tempo em milissegundos
    const timeDifference = Date.now() - new Date(item.created_at).getTime();
  
    // Função para excluir o post
    const deletePost = async (postId) => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
  
        if (userError || !userData?.user) {
          console.error("Erro ao obter o usuário:", userError);
          alert("Erro ao identificar o usuário. Faça login novamente.");
          return;
        }
  
        const user = userData.user;
  
        // Verifica se o post pertence ao usuário logado
        const { data: postData, error: postError } = await supabase
          .from("posts")
          .select("user_id")
          .eq("id", postId)
          .single();
  
        if (postError || !postData) {
          console.error("Erro ao verificar o post:", postError);
          alert("Erro ao encontrar o post. Tente novamente.");
          return;
        }
  
        // Se o user_id do post for diferente do usuário logado, não mostra o botão
        if (postData.user_id !== user.id) {
          alert("Você não tem permissão para excluir este post.");
          return;
        }
  
        // Exclui o post
        const { error } = await supabase
          .from("posts")
          .delete()
          .eq("id", postId);
  
        if (error) {
          console.error("Erro ao excluir o post:", error);
          alert("Erro ao excluir o post. Tente novamente.");
        } else {
          console.log("Post excluído com sucesso!");
          onRefresh(); // Atualiza a lista de posts
        }
      } catch (error) {
        console.error("Erro ao excluir o post:", error);
        alert("Erro ao excluir o post. Tente novamente.");
      }
    };
  
    // Obter o usuário logado
    const { data: userData } = supabase.auth.getUser();
    const user = userData?.user;
  
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedPost(item); // Define o post selecionado
          setViewPostModalVisible(true); // Exibe o modal
        }}
      >
        <View style={styles.postCard}>
          {/* Cabeçalho do post */}
          <View style={styles.postHeader}>
            <View style={styles.postProfilePic}></View>
            <View>
              {/* Nome do usuário */}
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                {item.users?.name || "Usuário Desconhecido"}
              </Text>
              {/* Nome de usuário */}
              <Text style={{ color: "#0077ff", fontSize: 14 }}>
                @{item.users?.username || "username"}
              </Text>
            </View>
            {/* Tempo relativo com verificação para "agora" */}
            <Text style={styles.postTime}>
              {timeDifference < 60000 // Menos de 1 minuto
                ? "agora"
                : formatDistanceToNow(new Date(item.created_at), {
                    addSuffix: true, // Adiciona "há"
                    locale: ptBR, // Configura o idioma para português
                  })}
            </Text>
          </View>
  
          {/* Conteúdo do post */}
          <Text style={{ color: "#fff", marginTop: -15, marginLeft: 77 }}>
            {item.content.length > 250
              ? item.content.substring(0, 200) + "..."
              : item.content}
          </Text>
  
          {/* Ações do post */}
          <View style={styles.postActions}>
            {/* Botão de Like */}
            <TouchableOpacity onPress={() => handleLike(item.id, currentLikes)}>
              <Ionicons name="heart-outline" size={24} color="#fff" />
              <Text style={{ color: "#fff" }}>{currentLikes}</Text>
            </TouchableOpacity>
  
            {/* Botão de Repetir (Retweet) */}
            <TouchableOpacity>
              <Ionicons name="repeat-outline" size={24} color="#fff" />
            </TouchableOpacity>
  
            {/* Botão de Salvar */}
            <TouchableOpacity onPress={() => handleSave(item.id, currentSave)}>
              <Ionicons name="bookmark-outline" size={24} color="#fff" />
              <Text style={{ color: "#fff" }}>{currentSave}</Text>
            </TouchableOpacity>
          </View>
  
          {/* Botão de Excluir - Visível apenas se o post foi criado pelo usuário logado */}
          {user && item.user_id === user.id && (
            <TouchableOpacity
              onPress={() => deletePost(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  
  
  

  return (
    <View style={styles.homeSection}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <>
            <HeaderApp />
            <View style={styles.homeContainer}>
              <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
                Para Você
              </Text>
              <View style={styles.divisor}></View>
            </View>
          </>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Modal para adicionar post */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>

            <Image
              source={{ uri: "https://via.placeholder.com/50" }}
              style={styles.userImage}
            />

            <TouchableOpacity style={styles.publishButton} onPress={addPost}>
              <Text style={styles.publishButtonText}>Publicar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <TextInput
              style={styles.inputTitle}
              value={newPostContent}
              onChangeText={setNewPostContent}
              placeholder="O que você está pensando?"
              placeholderTextColor="#aaa"
              multiline={true}
              numberOfLines={4}
              maxLength={400}
            />
            <Text
              style={[
                styles.charCount,
                newPostContent.length > 325 ? styles.warningCharCount : null,
              ]}
            >
              {newPostContent.length}/400 caracteres
            </Text>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal para visualizar post */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={viewPostModalVisible}
        onRequestClose={() => setViewPostModalVisible(false)}
      >
        <View style={styles.modalContainerr}>
          {/* Conteúdo do modal */}
          {selectedPost && (
            <View style={styles.viewModalContent}>
              {/* Usando ScrollView para tornar o conteúdo rolável */}
              <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
                {/* Seção do autor */}
                <View style={styles.authorSection}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setViewPostModalVisible(false)}
                  >
                    <Ionicons name="close" size={25} color="#fff" />
                  </TouchableOpacity>
                  <View style={styles.profilePic}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text style={styles.viewModalUsername}>
                      {selectedPost.users?.name || "Usuário Desconhecido"}
                    </Text>
                    <Text style={styles.viewModalUser}>
                      @{selectedPost.users?.username || "username"}
                    </Text>
                  </View>
                </View>

                {/* Conteúdo do post */}
                <Text style={styles.viewModalText}>{selectedPost.content}</Text>

                {/* Data do post */}
                <View style={styles.actionsContainer}>
                  <Text style={styles.viewModalDate}>
                    {new Date(selectedPost.created_at).toLocaleString()}
                  </Text>
                  <View style={styles.actionsSection}>
                    <TouchableOpacity style={styles.iconButton}>
                      <Ionicons name="heart-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                      <Ionicons
                        name="bookmark-outline"
                        size={24}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Lista de Comentários */}
                <View
                  style={{
                    borderTopColor: "#333",
                    paddingTop: 20,
                    borderTopWidth: 1,
                  }}
                >
                  <FlatList
                    data={comments.filter(
                      (comment) => comment.parent_id === null
                    )} // Comentários principais
                    renderItem={({ item }) => {
                      // Calcula o tempo relativo do comentário
                      const timeDifference =
                        Date.now() - new Date(item.created_at).getTime();
                      const formattedTime =
                        timeDifference < 60000
                          ? "agora"
                          : formatDistanceToNow(new Date(item.created_at), {
                              addSuffix: true,
                              locale: ptBR,
                            });

                      return (
                        <View style={styles.commentCard}>
                          {/* Cabeçalho do Comentário */}
                          <View
                            style={{
                              flexDirection: "row",
                              gap: 10,
                              alignItems: "center",
                            }}
                          >
                            <View style={styles.profilePicComent}></View>
                            <Text style={styles.commentAuthor}>
                              {item.users?.name || "Usuário Desconhecido"}
                            </Text>
                            <Text
                              style={{
                                color: "#0077ff",
                                fontWeight: "bold",
                                fontSize: 14,
                              }}
                            >
                              @{item.users?.username || "username"}
                            </Text>
                            <Text style={styles.postTime}>{formattedTime}</Text>
                          </View>

                          {/* Conteúdo do Comentário */}
                          <Text style={styles.commentContent}>
                            {item.content}
                          </Text>

                          {/* Botão de Responder */}
                          <TouchableOpacity
                            onPress={() => {
                              setReplyTo(item.id); // Define o id do comentário ao qual o usuário está respondendo
                              setNewComment(`@${item.users?.username} `); // Preenche o campo de comentário com @username
                              setIsReply(true); // Marca como resposta
                            }}
                          >
                            <Text style={{ color: "#0077ff", marginTop: 5 }}>
                              Responder
                            </Text>
                          </TouchableOpacity>

                          {/* Respostas */}
                          <FlatList
                            data={comments.filter(
                              (c) => c.parent_id === item.id
                            )} // Filtra as respostas para este comentário
                            renderItem={({ item: reply }) => {
                              // Calcula o tempo relativo da resposta
                              const replyTimeDifference =
                                Date.now() -
                                new Date(reply.created_at).getTime();
                              const replyFormattedTime =
                                replyTimeDifference < 60000
                                  ? "agora"
                                  : formatDistanceToNow(
                                      new Date(reply.created_at),
                                      {
                                        addSuffix: true,
                                        locale: ptBR,
                                      }
                                    );

                              return (
                                <View style={styles.replyCard}>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      gap: 10,
                                      alignItems: "center",
                                    }}
                                  >
                                    <View
                                      style={styles.profilePicComment}
                                    ></View>
                                    <Text style={styles.commentAuthor}>
                                      {reply.users?.name ||
                                        "Usuário Desconhecido"}
                                    </Text>
                                    <Text style={styles.postTime}>
                                      {replyFormattedTime}
                                    </Text>
                                  </View>
                                  <Text style={styles.replyContent}>
                                    {reply.content}
                                  </Text>
                                </View>
                              );
                            }}
                            keyExtractor={(reply) => reply.id.toString()}
                          />
                        </View>
                      );
                    }}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </View>
              </ScrollView>
            </View>
          )}

          {/* Segunda seção do autor */}
          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>Expresse sua opinião</Text>

            {/* Caixa de entrada de comentário */}
            <TextInput
              style={styles.commentInput}
              placeholder="Digite seu comentário..."
              placeholderTextColor="#aaa"
              multiline={true}
              value={newComment}
              onChangeText={setNewComment} // Atualiza o comentário conforme o usuário digita
            />

            {/* Botão de adicionar comentário */}
            <TouchableOpacity
              style={styles.addCommentButton}
              onPress={addComment} // Chama a função que adiciona o comentário
            >
              <Text style={styles.addCommentText}>
                {isReply ? "Responder" : "Adicionar Comentário"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  homeSection: {
    flex: 1,
    backgroundColor: "#101010",
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 35,
  },
  homeContainer: {
    paddingBottom: 20,
    padding: 20,
  },
  divisor: {
    backgroundColor: "#0077ff",
    padding: 1.3,
    top: 10,
    borderRadius: 15,
    width: 130,
  },
  postCard: {
    backgroundColor: "#101010",
    padding: 25,
    borderBottomWidth: 1,
    borderColor: "#303030",
  },
  postActions: {
    flexDirection: "row",
    gap: 25,
    marginTop: 30,
  },
  postHeader: {
    flexDirection: "row",
    gap: 15,
  },
  postProfilePic: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  postTime: {
    color: "#888",
    fontSize: 16,
    marginLeft: "auto",
  },
  addButton: {
    position: "absolute",
    bottom: 25,
    left: 20,
    backgroundColor: "#0077ff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalContainerr: {
    flex: 1,
    backgroundColor: "#101010",
    justifyContent: "flex-end",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 30,
    gap: 20,
    backgroundColor: "#101010",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  publishButton: {
    backgroundColor: "#0077ff",
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 5,
    marginLeft: "auto",
  },
  publishButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContent: {
    paddingHorizontal: 30,
    paddingTop: 20,
    backgroundColor: "#101010",
    paddingBottom: 100,
  },
  inputTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    paddingBottom: 100,
  },
  warningCharCount: {
    color: "red",
  },
  // modal de visualização
  viewModalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  authorSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  charCount: {
    color: "#aaa",
    fontSize: 12,
    textAlign: "right",
    marginTop: 5,
  },
  closeButton: {
    marginRight: 10,
    borderRadius: 5,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#0077ff",
    marginRight: 15,
  },
  profilePicComent: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "#0077ff",
  },
  viewModalUsername: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  viewModalUser: {
    color: "#0077ff",
    fontSize: 14,
    fontWeight: "bold",
  },
  viewModalText: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 20,
  },
  viewModalDate: {
    color: "#101010",
    fontSize: 14,
    marginTop: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  viewModalDate: {
    color: "#888",
    fontSize: 14,
  },
  actionsSection: {
    flexDirection: "row",
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },

  commentsSection: {
    backgroundColor: "#101010",
    marginTop: 30,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    borderTopColor: "#333",
  },
  commentsTitle: {
    paddingTop: 20,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commentInput: {
    backgroundColor: "#101010",
    color: "#fff",
    fontSize: 16,
    padding: 15,
    marginBottom: 10,
    height: 50,
    borderRadius: 5,
  },
  addCommentButton: {
    backgroundColor: "#0077ff",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  addCommentText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  commentCard: {
    backgroundColor: "#101010",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderColor: "#333",
  },
  commentAuthor: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  commentContent: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 7,
  },

  replyCard: {
    backgroundColor: "#181818", // Levemente mais claro para respostas
    paddingVertical: 15,
    borderRadius: 5,
    paddingHorizontal: 20,
    gap: 10,
    marginTop: 5,
    marginLeft: 7, // Indentação para respostas
  },

  profilePicComment: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "#0077ff",
  },

  replyContent: {
    color: "#fff",
  },

  deleteButtonText: {
    color: '#fff'
  }
});

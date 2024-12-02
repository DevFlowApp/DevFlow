import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Modal, Text, FlatList, ScrollView, TextInput, Button, TouchableWithoutFeedback } from 'react-native';
import DevFlowLogo from '../../assets/images/DevFlowLogo.png';
import { Ionicons } from '@expo/vector-icons';

const chats = [
  {
    id: '1',
    user: 'Usuário 1',
    username: '@username1',
    message: 'Olá, tudo bem? Gostaria de saber mais sobre o projeto.',
  },
  {
    id: '2',
    user: 'Usuário 2',
    username: '@username2',
    message: 'Estou aguardando uma resposta sua sobre a proposta.',
  },
  {
    id: '3',
    user: 'Usuário 3',
    username: '@username3',
    message: 'Por favor, entre em contato assim que possível.',
  },
];

const HeaderApp = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messagesState, setMessagesState] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const openChat = (chat) => {
    setSelectedChat(chat);
    setMessagesState([
      { id: '1', user: chat.user, username: chat.username, message: chat.message },
    ]);
  };

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: String(messagesState.length + 1),
        user: 'Você',
        message: newMessage,
      };
      setMessagesState((prevMessages) => [...prevMessages, newMsg]);
      setNewMessage('');
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

  const filteredChats = chats.filter((chat) =>
    chat.user.toLowerCase().includes(searchTerm.toLowerCase())
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
        <TouchableOpacity style={styles.profilePic}></TouchableOpacity>
      </View>

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
                {selectedChat ? (
                  <View style={styles.chatHeader}>
                    <TouchableOpacity
                      style={styles.backButton}
                      onPress={closeChat}
                    >
                      <Ionicons name="arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.userInfo}>
                      <View style={styles.profilePicContainer}></View>
                      <Text style={styles.userName}>
                        {selectedChat.user}
                        <Text style={styles.userHandle}>{selectedChat.username}</Text>
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.chatHeader}>
                    <Text style={styles.modalTitle}>Mensagens Diretas</Text>
                    <TouchableOpacity style={{ marginLeft: 'auto'}} onPress={closeModal}>
                      <Ionicons name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                  </View>
                )}

                {!selectedChat ? (
                  <>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Pesquisar"
                      placeholderTextColor="#888"
                      value={searchTerm}
                      onChangeText={setSearchTerm}
                    />
                    <FlatList
                      data={filteredChats}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <TouchableOpacity style={styles.chatItem} onPress={() => openChat(item)}>
                          <View style={styles.chatUserContainer}>
                            <View style={styles.profilePicContainer}></View>
                            <Text style={styles.chatUser}>{item.user}</Text>
                            <Text style={styles.userHandle}>{item.username}</Text>
                          </View>
                          <Text style={styles.chatMessage}>{item.message}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </>
                ) : (
                  <>
                    <ScrollView contentContainerStyle={{ marginTop: 10 }}>
                      <FlatList
                        data={messagesState}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                          <View style={[styles.messageContainer, item.user === 'Você' ? styles.sentMessage : styles.receivedMessage]}>
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
                      <Button title="Enviar" onPress={sendMessage} color="#0077ff" />
                    </View>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 80,
    backgroundColor: '#0C0C0C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: '70%',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  iconButton: {
    marginLeft: 20,
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 50,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    backgroundColor: '#101010',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
    height: '90%',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  userInfo: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  userName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  userHandle: {
    color: '#0077ff',
    fontSize: 18,
    fontWeight: 'normal',
    left: 10
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#202020',
    color: '#fff',
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  chatItem: {
    backgroundColor: '#202020',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  chatUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profilePicContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#555',
    borderRadius: 50,
  },
  chatUser: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatMessage: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 5,
  },
  messageContainer: {
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    maxWidth: '70%',
  },
  receivedMessage: {
    backgroundColor: '#202020',
    alignSelf: 'flex-start',
  },
  sentMessage: {
    backgroundColor: '#0077ff',
    alignSelf: 'flex-end',
  },
  messageUser: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageText: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 5,
  },
  inputContainer: {
    marginTop: 20,
    paddingBottom: 10,
    borderWidth: 0,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    backgroundColor: '#202020',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default HeaderApp;

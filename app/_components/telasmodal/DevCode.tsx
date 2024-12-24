import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router"; // Importando useRouter para navegação

const CodeEditor = () => {
  const router = useRouter();
  const [code, setCode] = useState(
    'function helloWorld() {\n  console.log("Hello, World!");\n}'
  );
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentFileName, setCurrentFileName] = useState('home.html');
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const goBack = () => {
    router.push("/(tabs)/home");
  };

  /** Salva novo arquivo/pasta */
  const saveNewItem = () => {
    if (isCreatingFile && newFileName) {
      setFiles([...files, { name: newFileName, type: 'file', content: '' }]);
      setCurrentFileName(newFileName);
    } else if (!isCreatingFile && newFolderName) {
      setFiles([...files, { name: newFolderName, type: 'folder' }]);
    } else {
      Alert.alert('Por favor, insira um nome válido.');
      return;
    }
    setShowModal(false);
    setNewFileName('');
    setNewFolderName('');
  };

  /** Função para alterar o arquivo atual */
  const handleFileSelect = (fileName) => {
    setCurrentFileName(fileName);
    const selectedFile = files.find(file => file.name === fileName);
    if (selectedFile) {
      setCode(selectedFile.content);
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão de Voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={goBack}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>

      {/* Botão de Menu */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setSidebarVisible(!sidebarVisible)}
      >
        <Ionicons
          name={sidebarVisible ? 'close' : 'menu'}
          size={30}
          color="white"
        />
      </TouchableOpacity>

      {/* Sidebar */}
      {sidebarVisible && (
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <Image style={styles.logo} />
          </View>
          <ScrollView style={styles.sidebarMenu}>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => setShowModal(true)}>
              <Ionicons name="add-circle-outline" size={24} color="white" />
              <Text style={styles.sidebarText}>Criar Arquivo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => setShowModal(true)}>
              <Ionicons name="folder-outline" size={24} color="white" />
              <Text style={styles.sidebarText}>Criar Pasta</Text>
            </TouchableOpacity>
            {/* Botão para acessar os arquivos criados */}
            <TouchableOpacity style={styles.sidebarItem} onPress={() => setShowModal(true)}>
              <Ionicons name="folder-open-outline" size={24} color="white" />
              <Text style={styles.sidebarText}>Abrir Arquivos</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Editor de Código */}
      <View style={[styles.editorContainer, sidebarVisible && styles.withSidebar]}>
        <Text style={styles.title}>DevCode</Text>
        <ScrollView>
          <TextInput
            multiline
            style={styles.codeInput}
            value={code}
            onChangeText={(text) => setCode(text)}
            selectionColor="gray"
            autoCorrect={false}
            spellCheck={false}
          />
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Arquivo: {currentFileName}</Text>
        </View>
      </View>

      {/* Modal */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isCreatingFile ? 'Criar Arquivo' : 'Criar Pasta'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder={isCreatingFile ? 'Nome do Arquivo (ex: home.html)' : 'Nome da Pasta'}
              value={isCreatingFile ? newFileName : newFolderName}
              onChangeText={isCreatingFile ? setNewFileName : setNewFolderName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={saveNewItem}>
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Lista de arquivos criados */}
      <View style={styles.fileList}>
        {files.map((file, index) => (
          file.type === 'file' && (
            <TouchableOpacity
              key={index}
              style={styles.fileItem}
              onPress={() => handleFileSelect(file.name)}
            >
              <Text style={styles.fileName}>{file.name}</Text>
            </TouchableOpacity>
          )
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1F27', // Cor de fundo escura similar ao tema Andromeda
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 10,
    zIndex: 3,
  },
  menuButton: {
    position: 'absolute',
    top: 70,
    right: 10,
    zIndex: 3,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 160,
    backgroundColor: '#2A2F3A', // Um tom mais escuro de azul
    paddingTop: 20,
    height: '120%',
    zIndex: 2,
  },
  sidebarHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 70,
  },
  sidebarMenu: { marginTop: 20 },
  sidebarItem: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  sidebarText: { color: '#C6C6C6', marginLeft: 10 }, // Texto claro em cinza
  editorContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1D1F27', // Manter fundo escuro no editor
  },
  title: { fontSize: 24, color: '#FFFFFF', marginBottom: 10, textAlign: 'center' },
  codeInput: {
    backgroundColor: '#252A34', // Tom de cinza mais escuro para o editor de código
    color: '#D1D7E2', // Cor de texto clara, puxando para o azul
    padding: 10,
    fontFamily: 'monospace',
    borderRadius: 5,
    minHeight: 400,
  },
  footer: { marginTop: 10 },
  footerText: { color: '#A0A3A8', textAlign: 'center' }, // Cor suave para o rodapé
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Cor do fundo do modal mais escura
  },
  modalContent: {
    backgroundColor: '#282C34', // Cor do modal no estilo escuro
    padding: 20,
    width: 300,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalTitle: { color: '#FFFFFF', fontSize: 18, marginBottom: 15 },
  modalInput: {
    backgroundColor: '#3A3F47', // Cor de fundo mais suave no input
    color: '#D1D7E2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  modalButtonCancel: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  modalButtonText: { color: '#FFFFFF', textAlign: 'center' },
  fileList: {
    marginTop: 20,
    padding: 10,
  },
  fileItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#2C2F38', // Estilo para cada arquivo
    borderRadius: 5,
  },
  fileName: { color: '#D1D7E2' }, // Nome do arquivo em texto claro
});

export default CodeEditor;

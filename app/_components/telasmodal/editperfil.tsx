import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Usando useRouter para acessar a query

const EditProfileScreen = () => {
  const router = useRouter();
  const { id } = router.query; // Obtendo o id da query string

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Verifica se o id foi passado via query
        if (id) {
          const { data, error } = await supabase
            .from("users")
            .select("name, username, email")
            .eq("id", id); // Busca os dados usando o id passado na URL

          if (error) {
            console.error("Erro ao carregar dados do usuário:", error);
          } else if (data && data.length > 0) {
            setUserData(data[0]); // Armazena os dados do usuário
          }
        }
      } catch (err) {
        console.error("Erro ao carregar dados do usuário:", err);
      }
    };

    loadUserData(); // Carrega os dados do usuário após a tela ser montada
  }, [id]); // Executa novamente sempre que o id mudar

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      <Text style={styles.info}>Nome: </Text>
      <TextInput
        style={styles.input}
        value={userData.name}
        // Lógica para editar nome
      />

      <Text style={styles.info}>Usuário: </Text>
      <TextInput
        style={styles.input}
        value={userData.username}
        // Lógica para editar username
      />

      <Text style={styles.info}>Email: </Text>
      <TextInput
        style={styles.input}
        value={userData.email}
        // Lógica para editar email
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default EditProfileScreen;

import React from 'react';
import { Text, View, StatusBar, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Postsave() {
  const router = useRouter();

  const goBack = () => {
    router.push("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#101010" />

      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Postagens salvas</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.cardImage}
          />
          <View style={styles.cardText}>
            <Text style={styles.cardName}>Nome do Usuário</Text>
            <Text style={styles.cardUsername}>@username</Text>
          </View>
          <Ionicons name="bookmark" size={24} color="#b0b0b0" />
        </View>
        <Text style={styles.cardDescription}>
          Este é o conteúdo do texto do card. Aqui você pode colocar mais detalhes.
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.cardImage}
          />
          <View style={styles.cardText}>
            <Text style={styles.cardName}>Nome do Usuário</Text>
            <Text style={styles.cardUsername}>@username</Text>
          </View>
          <Ionicons name="bookmark" size={24} color="#b0b0b0" />
        </View>
        <Text style={styles.cardDescription}>
          Este é o conteúdo do texto do card. Aqui você pode colocar mais detalhes.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    paddingTop: 40,
  },
  header: {
    height: 60,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  goBackButton: {
    marginRight: 10,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  card: {
    backgroundColor: '#101010',
    padding: 20,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#303030',
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  cardText: {
    justifyContent: 'center',
    marginRight: 'auto'
  },
  cardName: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardUsername: {
    color: '#0077ff',
    fontSize: 14,
  },
  cardDescription: {
    color: '#ffffff',
    marginTop: 10,
  },
});

import { StyleSheet, View, Text, ScrollView, FlatList, Image, TextInput } from "react-native";
import HeaderApp from "../_components/headerApp";

const courses = {
  categorias: [
    {
      id: "1",
      title: "HTML/CSS",
      color: "#FF5733", 
      cursos: [
        {
          id: "1",
          name: "Introdução ao HTML",
          description: "Aprenda os fundamentos básicos do HTML.",
          thumb: "https://via.placeholder.com/150/FF5733/FFFFFF?text=HTML", 
        },
        {
          id: "2",
          name: "HTML Avançado",
          description: "Domine HTML e aprimore suas habilidades.",
          thumb: "https://via.placeholder.com/150/FF5733/FFFFFF?text=HTML+2",
        },
      ],
    },


    {
      id: "1",
      title: "PHP",
      color: "#a0f", 
      cursos: [
        {
          id: "1",
          name: "Introdução ao HTML",
          description: "Aprenda os fundamentos básicos do HTML.",
          thumb: "https://via.placeholder.com/150/FF5733/FFFFFF?text=HTML", 
        },
        {
          id: "2",
          name: "HTML Avançado",
          description: "Domine HTML e aprimore suas habilidades.",
          thumb: "https://via.placeholder.com/150/FF5733/FFFFFF?text=HTML+2",
        },
      ],
    },
    
    {
      id: "2",
      title: "Python",
      color: "#2ECC71", 
      cursos: [
        {
          id: "3",
          name: "Python para Iniciantes",
          description: "Introdução à programação com Python.",
          thumb: "https://via.placeholder.com/150/2ECC71/FFFFFF?text=Python",
        },
        {
          id: "4",
          name: "Análise de Dados com Python",
          description: "Trabalhe com Pandas, Matplotlib e mais.",
          thumb: "https://via.placeholder.com/150/2ECC71/FFFFFF?text=Python+2",
        },
      ],
    },

    {
      id: "2",
      title: "JavaScript",
      color: "#ffff00", 
      cursos: [
        {
          id: "3",
          name: "Python para Iniciantes",
          description: "Introdução à programação com Python.",
          thumb: "https://via.placeholder.com/150/2ECC71/FFFFFF?text=Python",
        },
        {
          id: "4",
          name: "Análise de Dados com Python",
          description: "Trabalhe com Pandas, Matplotlib e mais.",
          thumb: "https://via.placeholder.com/150/2ECC71/FFFFFF?text=Python+2",
        },
      ],
    },

    {
      id: "2",
      title: "Java",
      color: "#ffd700", 
      cursos: [
        {
          id: "3",
          name: "Python para Iniciantes",
          description: "Introdução à programação com Python.",
          thumb: "https://via.placeholder.com/150/2ECC71/FFFFFF?text=Python",
        },
        {
          id: "4",
          name: "Análise de Dados com Python",
          description: "Trabalhe com Pandas, Matplotlib e mais.",
          thumb: "https://via.placeholder.com/150/2ECC71/FFFFFF?text=Python+2",
        },
      ],
    },

    {
      id: "2",
      title: "C+",
      color: "#5353ec", 
      cursos: [
        {
          id: "3",
          name: "Python para Iniciantes",
          description: "Introdução à programação com Python.",
          thumb: "https://via.placeholder.com/150/2ECC71/FFFFFF?text=Python",
        },
        {
          id: "4",
          name: "Análise de Dados com Python",
          description: "Trabalhe com Pandas, Matplotlib e mais.",
          thumb: "https://via.placeholder.com/150/2ECC71/FFFFFF?text=Python+2",
        },
      ],
    },

    {
      id: "3",
      title: "React",
      color: "#3498DB", 
      cursos: [
        {
          id: "5",
          name: "React Básico",
          description: "Aprenda a criar componentes e interfaces.",
          thumb: "https://via.placeholder.com/150/3498DB/FFFFFF?text=React",
        },
        {
          id: "6",
          name: "React Avançado",
          description: "Aprofunde-se com hooks e performance.",
          thumb: "https://via.placeholder.com/150/3498DB/FFFFFF?text=React+2",
        },
      ],
    },
  ],
};

export default function Cursos() {
  return (
    <>
      <View style={styles.coursesSection}>
        <HeaderApp />
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar cursos..."
            placeholderTextColor="#666"
          />
        </View>
        <ScrollView>
          {courses.categorias.map((categoria) => (
            <View key={categoria.id} style={styles.coursesContainer}>
              <View style={[styles.categoryHeader, { borderColor: categoria.color }]}>
                <View style={[styles.neonIcon, { borderColor: categoria.color, shadowColor: categoria.color }]}>
                  <Text style={[styles.iconText, { color: categoria.color }]}>
                    {categoria.title[0]}
                  </Text>
                </View>
                <Text style={styles.sectionTitle}>{categoria.title}</Text>
              </View>
              <FlatList
                data={categoria.cursos}
                renderItem={({ item }) => (
                  <View style={styles.courseCard}>
                    <Image source={{ uri: item.thumb }} style={styles.thumbnail} />
                    <View style={styles.courseInfo}>
                      <Text style={styles.courseName}>{item.name}</Text>
                      <Text style={styles.courseDescription}>
                        {item.description.length > 50
                          ? `${item.description.substring(0, 50)}...`
                          : item.description}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
                horizontal={true}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  coursesSection: {
    flex: 1,
    backgroundColor: "#101010",
    paddingTop: 40,
  },

  searchBar: {
    backgroundColor: '#0C0C0C',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
    borderColor: "#0077ff", 
    borderWidth: 1, 
    borderRadius: 66, 
  },
  

  searchInput: {
    backgroundColor: "#101010",
    color: "#fff",
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },

  coursesContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
    gap: 20,
    borderBottomWidth: 1,
    borderColor: "#303030",
  },

  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 2,
    paddingBottom: 15,
  },

  neonIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#151515",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderWidth: 2,
  },

  iconText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  courseCard: {
    backgroundColor: "#151515",
    flexDirection: "column",
    padding: 10,
    borderRadius: 5,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#303030",
  },

  thumbnail: {
    width: "100%",
    height: 120,
    borderRadius: 5,
    marginBottom: 20,
  },

  courseInfo: {
    flex: 1,
    justifyContent: "center",
  },

  courseName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  courseDescription: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 5,
  },
});

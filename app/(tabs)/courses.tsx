import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";
import HeaderApp from "../_components/headerApp";

const courses = {
  cursos: [
    {
      id: "1",
      name: "Desenvolvimento Web com React",
      description:
        "Aprenda os fundamentos do desenvolvimento web, incluindo HTML, CSS, JavaScript e React.js. Crie páginas interativas e dinâmicas com React.",
    },
    {
      id: "2",
      name: "Design Gráfico com Adobe Photoshop",
      description:
        "Domine o Adobe Photoshop para criar designs incríveis, desde logotipos até edição de imagens e materiais gráficos.",
    },
    {
      id: "3",
      name: "Introdução ao Desenvolvimento Mobile com React Native",
      description:
        "Aprenda a criar aplicativos móveis nativos para iOS e Android com uma base de código compartilhada usando React Native.",
    },
    {
      id: "4",
      name: "Gestão de Banco de Dados MySQL",
      description:
        "Aprenda a criar, administrar e otimizar bancos de dados MySQL, incluindo consultas SQL, relacionamentos e segurança.",
    },
  ],
  cursosPopulares: [
    {
      id: "5",
      name: "Análise de Dados com Python",
      description:
        "Aprenda a importar, processar e visualizar dados usando Python com bibliotecas como Pandas, Matplotlib e Seaborn.",
    },
    {
      id: "6",
      name: "Marketing Digital e SEO",
      description:
        "Estude estratégias de marketing digital e técnicas de SEO para atrair, engajar e converter clientes, otimizando seu site.",
    },
    {
      id: "7",
      name: "Programação para Iniciantes com Python",
      description:
        "Aprenda lógica de programação e os conceitos fundamentais de programação com Python, criando programas úteis e práticas.",
    },
    {
      id: "8",
      name: "UX/UI Design para Web e Mobile",
      description:
        "Crie interfaces intuitivas e atraentes, com foco em design de UX/UI, wireframes, protótipos e design responsivo.",
    },
  ],
  continueAssistindo: [
    {
      id: "9",
      name: "JavaScript Avançado",
      description:
        "Aprofunde seus conhecimentos em JavaScript, explorando tópicos avançados, como promessas, async/await e manipulação de APIs.",
    },
    {
      id: "10",
      name: "React Native para Iniciantes",
      description:
        "Aprenda os conceitos básicos de React Native e comece a criar seus primeiros aplicativos móveis para iOS e Android.",
    },
    {
      id: "11",
      name: "Desenvolvimento Web com Node.js",
      description:
        "Aprenda a criar servidores e aplicações com Node.js, utilizando Express.js, banco de dados e autenticação de usuários.",
    },
  ],
};

export default function Cursos() {
  return (
    <>
      <HeaderApp />
      <View style={styles.coursesSection}>
        <ScrollView>
          <View style={styles.coursesContainer}>
            <Text style={styles.sectionTitle}>Cursos</Text>
            <FlatList
              data={courses.cursos}
              renderItem={({ item }) => (
                <View style={styles.courseCard}>
                  <Text style={styles.courseName}>{item.name}</Text>
                  <Text style={styles.courseDescription}>{item.description}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
          </View>

          <View style={styles.coursesContainer}>
            <Text style={styles.sectionTitle}>Cursos Populares</Text>
            <FlatList
              data={courses.cursosPopulares}
              renderItem={({ item }) => (
                <View style={styles.courseCard}>
                  <Text style={styles.courseName}>{item.name}</Text>
                  <Text style={styles.courseDescription}>{item.description}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
          </View>
          <View style={styles.coursesContainer}>
            <Text style={styles.sectionTitle}>Continue Assistindo</Text>
            <FlatList
              data={courses.continueAssistindo}
              renderItem={({ item }) => (
                <View style={styles.courseCard}>
                  <Text style={styles.courseName}>{item.name}</Text>
                  <Text style={styles.courseDescription}>{item.description}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  coursesSection: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  coursesContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  courseCard: {
    backgroundColor: "#101010",
    padding: 20,
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#222",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    width: 250, 
  },

  courseName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  courseDescription: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

// Mapeamento de nomes de hortaliças para imagens locais
const imagensHortalicas = {
  alface: require("./assets/imagens/alface.jpeg"),
  tomate: require("./assets/imagens/tomate.jpeg"),
  cenoura: require("./assets/imagens/cenoura.jpeg"),
  rucula: require("./assets/imagens/rucula.jpeg"),
};

export default function Home() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
  });
  const [hortalicaSelecionada, setHortalicaSelecionada] = useState(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  // Exemplo de array com algumas hortaliças (pode ser substituído por dados dinâmicos)
  const [hortalicas, setHortalicas] = useState([
    { id: "1", nome: "Cenoura", imagem: imagensHortalicas.cenoura, status: "Saudável", temperatura: "25°C", umidade: "60%", tempoPlantada: "20 dias" },
    { id: "2", nome: "Tomate-cereja", imagem: imagensHortalicas.tomate, status: "Saudável", temperatura: "22°C", umidade: "65%", tempoPlantada: "30 dias" },
    { id: "3", nome: "Rúcula", imagem: imagensHortalicas.rucula, status: "Saudável", temperatura: "20°C", umidade: "70%", tempoPlantada: "15 dias" },
  ]);

  const selecionarHortalica = (id) => {
    if (hortalicaSelecionada === id) {
      setHortalicaSelecionada(null);
      setMostrarDetalhes(false);
    } else {
      setHortalicaSelecionada(id);
      setMostrarDetalhes(true);
    }
  };

  if (!fontsLoaded) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imagem}
        source={require("./assets/logotipo_econecta_341x98.png")}
      />
      <Text style={styles.texto}>
        {"\n"}{"\n"}{"\n"}{"\n"}
      </Text>

      {/* Estilo de horta em quadrantes */}
      <FlatList
        data={hortalicas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selecionarHortalica(item.id)}>
            <View style={styles.quadrante}>
              <Image source={item.imagem} style={styles.hortalicaImagem} />
              <View style={styles.labelContainer}>
                <Text style={styles.hortalicaNome}>{item.nome}</Text>
              </View>
              {hortalicaSelecionada === item.id && (
                <>
                  <Text style={styles.hortalicaStatus}>Status: {item.status}</Text>
                  <TouchableOpacity
                    onPress={() => setMostrarDetalhes(!mostrarDetalhes)}
                  >
                    <Text style={styles.visionLink}>
                      {mostrarDetalhes ? "Ocultar detalhes" : "Ver visão completa"}
                    </Text>
                  </TouchableOpacity>
                  {mostrarDetalhes && (
                    <View style={styles.detalhes}>
                      <Text>Temperatura: {item.temperatura}</Text>
                      <Text>Umidade: {item.umidade}</Text>
                      <Text>Tempo Plantada: {item.tempoPlantada}</Text>
                    </View>
                  )}
                </>
              )}
            </View>
          </TouchableOpacity>
        )}
        numColumns={3}
        columnWrapperStyle={styles.row}
      />

      {/* Navegação inferior */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.icon}
            source={require("./assets/imagens/house.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddCultura", { hortalicas, setHortalicas })}
        >
          <Image
            style={styles.icon}
            source={require("./assets/imagens/plant.png")}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate("ChatSuporte")}>
          <Image
            style={styles.icon}
            source={require("./assets/imagens/chat.png")}
          />
        </TouchableOpacity> */}
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("./assets/imagens/graphbar.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Conta")}>
          <Image
            style={styles.icon}
            source={require("./assets/imagens/user.png")}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate("TesteGrafana")}>
          <Image
            style={styles.icon}
            source={require("./assets/imagens/cenoura.jpeg")}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagem: {
    position: "absolute",
    top: 0,
    width: 150,
    height: 40,
    alignSelf: "center",
    marginTop: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#364b56",
  },
  texto: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  row: {
    justifyContent: "space-between",
  },
  quadrante: {
    backgroundColor: "#A0522D",
    margin: 5,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2E2E2E",
  },
  hortalicaImagem: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  labelContainer: {
    position: "absolute",
    bottom: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  hortalicaNome: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  hortalicaStatus: {
    fontSize: 14,
    color: "green",
  },
  visionLink: {
    color: "blue",
    marginTop: 5,
  },
  detalhes: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    margin: 15,
  },
});

import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

// Substitua pela sua chave da API do Pexels
const PEXELS_API_KEY = "EqoPh4kf9BUr97tpsVBBL0xjgVFXAHJt3aDdt7RBlSUTxXgIkH5CWd7K";

// Função para traduzir o nome da hortaliça ou fruta para inglês
const traducaoParaIngles = async (texto) => {
  try {
    const response = await axios.post('https://libretranslate.com/translate', {
      q: texto,
      source: 'pt', // Português
      target: 'en', // Inglês
      format: 'text'
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    return response.data.translatedText; // Retorna o texto traduzido
  } catch (error) {
    console.error("Erro ao traduzir o termo:", error);
    return texto; // Retorna o texto original em caso de erro
  }
};

// Função para buscar imagem no Pexels com o termo "agriculture" como contexto
const buscarImagemPexels = async (query) => {
  try {
    const queryAgricultura = `agriculture fruit vegetable hortalica ${query}`;

    const response = await axios.get("https://api.pexels.com/v1/search", {
      params: { query: queryAgricultura, per_page: 3 },
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });

    const imagens = response.data.photos;

    if (imagens.length > 0) {
      const imagemRelevante = imagens.find((imagem) =>
        imagem.alt.toLowerCase().includes(query.toLowerCase())
      );

      if (imagemRelevante) {
        return imagemRelevante.src.medium;
      } else {
        return imagens[0]?.src.medium || require("./assets/imagens/plant.png");
      }
    } else {
      return require("./assets/imagens/plant.png");
    }
  } catch (error) {
    console.error("Erro ao buscar imagem no Pexels:", error);
    return require("./assets/imagens/plant.png");
  }
};

export default function AddCultura({ route }) {
  const [nome, setNome] = useState("");
  const navigation = useNavigation();
  const { hortalicas, setHortalicas } = route.params;

  const adicionarHortalica = async () => {
    if (nome) {
      const nomeLower = nome.toLowerCase();
      let imagem = require("./assets/imagens/plant.png"); // Imagem padrão

      // Verifica se o nome é "cenoura" ou "rúcula" e atribui a imagem correta
      if (nomeLower === "cenoura") {
        imagem = require("./assets/imagens/cenoura.jpeg");
      } else if (nomeLower === "rúcula" || nomeLower === "rucula") {
        imagem = require("./assets/imagens/rucula.jpeg");
      } else {
        // Traduz o nome da hortaliça para inglês antes de buscar a imagem
        const nomeEmIngles = await traducaoParaIngles(nomeLower);
        const imagemUrl = await buscarImagemPexels(nomeEmIngles);
        if (imagemUrl) {
          imagem = { uri: imagemUrl };
        }
      }

      const newHortalica = {
        id: String(hortalicas.length + 1),
        nome,
        status: "Nova",
        temperatura: "22°C",
        umidade: "60%",
        tempoPlantada: "5 dias",
        imagem,
      };

      setHortalicas([...hortalicas, newHortalica]);
      setNome("");
      navigation.goBack(); // Volta para a tela anterior após adicionar
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome da hortaliça"
        value={nome}
        onChangeText={setNome}
      />
      <Button title="Adicionar Hortaliça" onPress={adicionarHortalica} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#364b56",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

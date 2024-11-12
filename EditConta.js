import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BotaoCustomizado from "./BotaoCustomizado";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

export default function Entrar() {
  const navigation = useNavigation();

  // Carregar fontes personalizadas usando expo-font
  const [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Retorna null ou um indicador de carregamento enquanto as fontes estão sendo carregadas
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imagem}
        source={require("./assets/logotipo_econecta_341x98.png")}
      />
      <Text style={styles.texto}>
        {"\n"}
        {"\n"}
        {"\n"}Entrar
        {"\n"}
      </Text>

      {/* Campo de entrada para e-mail */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Digite seu e-mail"
          placeholderTextColor="#ccc"
        />
      </View>

      {/* Campo de entrada para senha */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
        />
      </View>

      {/* Esqueceu a senha */}
      <TouchableOpacity>
        <Text style={styles.esqueceuSenha}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      {/* Botão de Login */}
      <View style={styles.containerBotao}>
        <BotaoCustomizado
          corBotao="#f28123"
          corTexto="#364b56"
          onPress={() => navigation.navigate("Home")}
          title="Entrar"
          
  tamanhoBotao={{ width: 300, height: 60 }}
        />
      </View>

      <Text style={styles.label}>
        {"\n"}
        {"\n"}Ou entre com
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 20,
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 50, height: 50, margin:20 }}
          source={require("./assets/imagens/google.png")}
        />
        <Image
          style={{ width: 50, height: 50, margin:20 }}
          source={require("./assets/imagens/facebook.png")}
        />
        <Image
          style={{ width: 50, height: 50, margin:20 }}
          source={require("./assets/imagens/apple.png")}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 20,
          alignItems: "center",
        }}
      >
        {/* Corrected <Text> component */}
        <Text
          style={{ color: "#ffff", fontFamily: "Montserrat", fontSize: 17 }}
        >
          Ainda não possui uma conta?
        </Text>
        <TouchableOpacity
          style={{ color: "#f28123", fontFamily: "Montserrat", fontSize: 10 }}
          onPress={() => navigation.navigate("Cadastrar")}
        >
          <Text
            style={{ color: "#f28123", fontFamily: "Montserrat", fontSize: 15 }}
          >
            Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagem: {
    position: "absolute", // Posiciona a imagem de forma absoluta
    top: 0, // Coloca a imagem no topo
    width: 150,
    height: 40,
    alignSelf: "center", // Centraliza horizontalmente
    marginTop: 40, // Adiciona um espaçamento do topo da tela
  },
  imagemApps: {
    width: 20,
    height: 20,
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
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    color: "#ffffff",
    fontFamily: "Montserrat",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#364b56",
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "Montserrat",
  },
  esqueceuSenha: {
    fontSize: 14,
    color: "#fc7217",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  containerBotao: {
    marginTop: 0,
    width: "100%",
    alignItems: "center",
  },
});

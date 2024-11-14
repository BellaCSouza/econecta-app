import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Conta({ route }) {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);
  const { email } = route.params;  // Recebe o e-mail do cadastro, assumindo que você o passe pela navegação

  // Função para buscar os dados do usuário
  const buscarUsuario = async () => {
    try {
      const response = await fetch('`http://10.0.2.2:3000/usuario?email=${email}`');
      const data = await response.json();

      if (response.ok) {
        setUsuario(data);
      } else {
        Alert.alert("Erro", data.error || "Erro ao buscar dados do usuário");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao buscar os dados.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (email) {
      buscarUsuario();
    }
  }, [email]);

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require("./assets/logotipo_econecta_341x98.png")}
          style={styles.imagem}
        />
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.input}>{usuario.nome_usuario}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail</Text>
            <Text style={styles.input}>{usuario.email}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>CPF</Text>
            <Text style={styles.input}>{usuario.cpf}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>CEP</Text>
            <Text style={styles.input}>{usuario.cep}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Logradouro</Text>
            <Text style={styles.input}>{usuario.logradouro}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Número</Text>
            <Text style={styles.input}>{usuario.numero}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Complemento</Text>
            <Text style={styles.input}>{usuario.complemento}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Bairro</Text>
            <Text style={styles.input}>{usuario.bairro}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cidade</Text>
            <Text style={styles.input}>{usuario.cidade}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Estado</Text>
            <Text style={styles.input}>{usuario.estado}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>País</Text>
            <Text style={styles.input}>{usuario.pais}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#364b56",
    paddingTop: 50,
    paddingHorizontal: 100,
  },
  imagem: {
    width: 150,
    height: 40,
    marginVertical: 20,
  },
  form: {
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  inputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  label: {
    color: "#fff",
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    marginBottom: 30,
    width: '100%',
    color: "#fff",
  },
});

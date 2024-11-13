import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Alert, ScrollView } from "react-native";
import BotaoCustomizado from "./BotaoCustomizado";
import { useNavigation } from "@react-navigation/native";

export default function Cadastrar() {
  const navigation = useNavigation();

  const [nome_usuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [pais, setPais] = useState("");

  // Função de validação de formulário
  const validarFormulario = () => {
    if (!nome_usuario || !email || !senha) {
      Alert.alert("Erro", "Campos obrigatórios não preenchidos!");
      return false;
    }
    return true;
  };

  // Função de cadastro de usuário
  const realizarCadastro = async () => {
    if (!validarFormulario()) return;

    const usuario = { nome_usuario, email, senha, cpf, cep, logradouro, numero, complemento, bairro, cidade, estado, pais };

    try {
      const response = await fetch("http://10.0.2.2:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Erro", data.error || "Erro ao cadastrar usuário");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar salvar os dados.");
      console.error(error);
    }
  };

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
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={nome_usuario}
              onChangeText={setNomeUsuario}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="exemplo@dominio.com"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu CPF"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={cpf}
              onChangeText={setCpf}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>CEP</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu CEP"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={cep}
              onChangeText={setCep}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Logradouro</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu Logradouro"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={logradouro}
              onChangeText={setLogradouro}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Número</Text>
            <TextInput
              style={styles.input}
              placeholder="Número"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={numero}
              onChangeText={setNumero}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Complemento</Text>
            <TextInput
              style={styles.input}
              placeholder="Complemento"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={complemento}
              onChangeText={setComplemento}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Bairro</Text>
            <TextInput
              style={styles.input}
              placeholder="Bairro"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={bairro}
              onChangeText={setBairro}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cidade</Text>
            <TextInput
              style={styles.input}
              placeholder="Cidade"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={cidade}
              onChangeText={setCidade}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Estado</Text>
            <TextInput
              style={styles.input}
              placeholder="Estado"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={estado}
              onChangeText={setEstado}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>País</Text>
            <TextInput
              style={styles.input}
              placeholder="País"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={pais}
              onChangeText={setPais}
            />
          </View>
        </View>

        <BotaoCustomizado
          corBotao="#f28123"
          corTexto="#364b56"
          style={styles.BotaoCustomizado}
          onPress={realizarCadastro} // Chamando a função de cadastro ao pressionar o botão
          title="Confirmar"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20,
            alignItems: "center",
          }}
        >
          <Text style={styles.label}>Já possui uma conta?</Text>
          <Text
            onPress={() => navigation.navigate("Entrar")}
            style={{ color: "#f28123", fontFamily: "Montserrat", fontSize: 15 }}
          >
            Entre
          </Text>
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
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 30,
    backgroundColor: "#364b56",
    color: "#ffff",
  },
});


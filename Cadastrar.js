import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Alert, ScrollView } from "react-native";
import BotaoCustomizado from "./BotaoCustomizado";
import { useNavigation } from "@react-navigation/native";

export default function Cadastrar() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");

  // Validação de formulário
  const validarFormulario = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Todos os campos obrigatórios precisam ser preenchidos.");
      return false;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return false;
    }
    return true;
  };

  // Função disparada ao clicar no botão "Confirmar"
  const realizarCadastro = async () => {
    if (!validarFormulario()) return;

    // Montagem do objeto de usuário a ser enviado
    const usuario = { nome, email, senha, dataNascimento, telefone };

    try {
      // Substitua o IP "192.168.x.x" pelo IP correto do seu servidor Node.js
      const response = await fetch("http://10.0.2.2:3000/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
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
              value={nome}
              onChangeText={setNome}
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
            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Data de Nascimento</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={dataNascimento}
              onChangeText={setDataNascimento}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              placeholder="(XX) XXXXX-XXXX"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="phone-pad"
              value={telefone}
              onChangeText={setTelefone}
            />
          </View>
        </View>

        <BotaoCustomizado
          corBotao="#f28123"
          corTexto="#364b56"
          style={styles.BotaoCustomizado}
          onPress={realizarCadastro}  // Chamando a função de cadastro ao pressionar o botão
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
    color: "#fff",
  },
});
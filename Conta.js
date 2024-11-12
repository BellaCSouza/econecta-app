import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ScrollView, Alert, Dimensions } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import BotaoCustomizado from './BotaoCustomizado';
import { v4 as uuidv4 } from 'uuid';
const uuid = require('uuid').v4;
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get('window'); // Pegando a largura da tela

export default function Conta() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [profileImage, setProfileImage] = useState(require('./assets/imagens/user.png'));
  const [notificacoesVisible, setNotificacoesVisible] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');

  const pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      Alert.alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    const response = await launchImageLibrary(options);
    console.log(response);
    if (response.didCancel) {
      Alert.alert('Seleção de imagem cancelada');
    } else if (response.errorCode) {
      Alert.alert('Erro ao selecionar imagem:', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const source = { uri: response.assets[0].uri };
      setProfileImage(source);
    }
  };

  const handleSalvar = () => {
    try {
      // Lógica para salvar as informações (não implementada)
    } catch (error) {
      alert('Informações salvas!');
    }
  };

  const opcoesNotificacoes = [
    'Silenciar todas',
    'Silenciar apenas blog',
    'Silenciar apenas horta',
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Contêiner posicionado no canto superior direito */}
      <View style={styles.userContainer}>
        <Text style={styles.textoUsuario}>Usuário</Text>
        <Image style={styles.profileImage} source={profileImage} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome Completo:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nome"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          placeholder="Digite seu telefone"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />

        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Digite seu e-mail"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />

        <Text style={styles.label}>Sexo:</Text>
        <TextInput
          style={styles.input}
          value={novaSenha}
          onChangeText={setNovaSenha}
          secureTextEntry
          placeholder="Sexo"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />

        <Text style={styles.label}>Endereço:</Text>
        <TextInput
          style={styles.input}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
          placeholder="Seu endereço"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />

        <TouchableOpacity
          style={styles.notificacoesContainer}
          onPress={() => setNotificacoesVisible(!notificacoesVisible)}
        >
          <Text style={styles.label}>Notificações </Text>
          <Text style={styles.toggleText}>
            {notificacoesVisible ? 'Ocultar' : 'Mostrar'}
          </Text>
        </TouchableOpacity>

        {notificacoesVisible && (
          <FlatList
            data={opcoesNotificacoes}
            keyExtractor={(item) => uuid()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.opcaoNotificacao}
                onPress={() => setOpcaoSelecionada(item)}
              >
                <Text style={styles.opcaoTexto}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <TouchableOpacity
         onPress={() => navigation.navigate("EditConta")}>
        <Text style={{color: '#f28123', fontSize: 20, marginLeft:300}}>
          Editar
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  // Estilo para posicionar o contêiner no canto superior direito
  userContainer: {
    position: 'absolute', // Posiciona o contêiner de forma absoluta
    top: 20, // Distância do topo
    right: 20, // Distância da direita
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: screenWidth * 0.1, // 10% da largura da tela
    height: screenWidth * 0.1, // 10% da largura da tela
    borderRadius: (screenWidth * 0.1) / 2, // Torna a imagem circular
    marginLeft: 10, // Espaçamento entre o texto e a imagem
  },
  texto: {
    fontSize: 18,
    color: '#fff',
  },
  textoUsuario: {
    fontSize: 30,
    color: '#fff',
    position:'static',
    left: -215,
  },
  infoContainer: {
    marginTop: 100, // Ajusta o conteúdo abaixo do contêiner do usuário
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    marginBottom: 30,
    width: '100%', // O input ocupa toda a largura disponível
  },
  notificacoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  toggleText: {
    color: '#f28123',
  },
  opcaoNotificacao: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  opcaoTexto: {
    fontSize: 14,
    color: '#364b56',
  },
});
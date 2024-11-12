import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const BotaoCustomizado = ({ onPress, title, corBotao, corTexto, tamanhoBotao }) => {
  // Verifica se tamanhoBotao foi passado, caso contrário, usa valores padrão
  const largura = tamanhoBotao?.width || 270;
  const altura = tamanhoBotao?.height || 50;

  return (
    <TouchableOpacity
      style={[styles.botao, { backgroundColor: corBotao, width: largura, height: altura }]}
      onPress={onPress}
    >
      <Text style={[styles.texto, { color: corTexto }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  botao: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 20,
  },
  texto: {
    fontSize: 23,
    textAlign: 'justify',
    lineHeight: 22,
    letterSpacing: 0.25,
    fontFamily: './assets/fonts/Montserrat/static/Montserrat-Bold.ttf',
  },
});

export default BotaoCustomizado;
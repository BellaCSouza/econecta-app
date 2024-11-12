import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Image, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Iniciar from "./Iniciar";
import Entrar from "./Entrar";
import Cadastrar from "./Cadastrar";
import Home from "./Home";
import ChatSuporte from "./ChatSuporte";
import Conta from "./Conta";
import EditConta from "./EditConta";
import AddCultura from "./AddCultura";
// import TesteGrafana from "./TesteGrafana";

const Stack = createStackNavigator();

function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Iniciar");
    }, 2000); // 2 segundos
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/logotipo_econecta_341x98.png")}
        style={styles.imagem}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Iniciar"
          component={Iniciar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Entrar"
          component={Entrar}
          options={{ headerShown: false }} // Define o título da tela "Entrar"
        />

        <Stack.Screen
          name="Cadastrar"
          component={Cadastrar}
          options={{ headerShown: false }} // Define o título da tela "Cadastrar"
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }} // Define o título da tela "Home"
        />
        {/* <Stack.Screen
          name="ChatSuporte"
          component={ChatSuporte}
          options={{ title: "ChatSuporte" }} // Define o título da tela "Suporte"
        /> */}
        <Stack.Screen
          name="Conta"
          component={Conta}
          options={{ title: "Conta" }} // Define o título da tela "Conta"
        />
        <Stack.Screen
        name="EditConta"
        component={EditConta}
        options={{ title: "EditConta" }} // Define o título da tela "Suporte"
        />
        <Stack.Screen
          name="AddCultura"
          component={AddCultura}
          options={{ title: "AddCultura" }} // Define o título da tela "Conta"
        />
        {/* <Stack.Screen
          name="TesteGrafana"
          component={TesteGrafana}
          options={{ title: "TesteGrafana" }} // Define o título da tela "TesteGrafana"
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#364b56",
    alignItems: "center",
    justifyContent: "center",
  },
  imagem: {
    width: 280,
    height: 70,
  },
});

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaLogin from "./src/telas/TelaLogin";
import TelaProdutos from "./src/telas/TelaProdutos";
import TelaDetalhesProduto from "./src/telas/TelaDetalhesProduto";
import TelaAdmin from "./src/telas/TelaAdmin";
import TelaCarrinho from "./src/telas/TelaCarrinho";
import TelaEditarProduto from "./src/telas/TelaEditarProduto";
import TelaAdicionarProduto from "./src/telas/TelaAdicionarProduto";
import TelaBuscaProdutos from "./src/telas/TelaBuscaProdutos";

import { RotasPrincipais } from "./src/tipos/tiposRotas";

const Stack = createNativeStackNavigator<RotasPrincipais>();

export default function App() {
  const [logado, setLogado] = useState(false);

  const handleLogin = () => {
    console.log("✅ Login efetuado com sucesso!");
    setLogado(true);
  };

  const handleLogout = () => {
    console.log("👋 Logout realizado.");
    setLogado(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {!logado ? (
          <Stack.Screen name="Login">
            {() => <TelaLogin aoLoginSucesso={handleLogin} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Produtos">
              {() => <TelaProdutos aoLogout={handleLogout} />}
            </Stack.Screen>

            <Stack.Screen
              name="DetalhesProduto"
              component={TelaDetalhesProduto}
              options={{ headerShown: true, title: "Detalhes do Produto" }}
            />

            <Stack.Screen
              name="Admin"
              component={TelaAdmin}
              options={{ headerShown: true, title: "Administração" }}
            />

            <Stack.Screen
              name="Carrinho"
              component={TelaCarrinho}
              options={{ headerShown: true, title: "Carrinho de Compras" }}
            />

            <Stack.Screen
              name="EditarProduto"
              component={TelaEditarProduto}
              options={{ headerShown: true, title: "Editar Produto" }}
            />

            <Stack.Screen
              name="AdicionarProduto"
              component={TelaAdicionarProduto}
              options={{ headerShown: true, title: "Novo Produto" }}
            />

            <Stack.Screen
              name="BuscaProdutos"
              component={TelaBuscaProdutos}
              options={{ headerShown: true, title: "Buscar Produtos" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

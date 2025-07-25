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

import { RotasPrincipais } from "./src/tipos/tiposRotas";

const Stack = createNativeStackNavigator<RotasPrincipais>();

export default function App() {
  const [logado, setLogado] = useState(false);

  const handleLogin = () => {
    setLogado(true);
  };

  const handleLogout = () => {
    setLogado(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!logado ? (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => <TelaLogin aoLoginSucesso={handleLogin} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Produtos" options={{ title: "Produtos" }}>
              {() => <TelaProdutos aoLogout={handleLogout} />}
            </Stack.Screen>

            <Stack.Screen
              name="DetalhesProduto"
              component={TelaDetalhesProduto}
              options={{ title: "Detalhes do Produto" }}
            />

            <Stack.Screen
              name="Admin"
              component={TelaAdmin}
              options={{ title: "Administração" }}
            />

            <Stack.Screen
              name="Carrinho"
              component={TelaCarrinho}
              options={{ title: "Carrinho de Compras" }}
            />

            <Stack.Screen
              name="EditarProduto"
              component={TelaEditarProduto}
              options={{ title: "Editar Produto" }}
            />

            <Stack.Screen
              name="AdicionarProduto"
              component={TelaAdicionarProduto}
              options={{ title: "Novo Produto" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

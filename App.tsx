import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaLogin from "./src/telas/TelaLogin";
import TelaProdutos from "./src/telas/TelaProdutos";
import TelaDetalhesProduto from "./src/telas/TelaDetalhesProduto";
import TelaBuscaProdutos from "./src/telas/TelaBuscaProdutos";
import TelaAdmin from "./src/telas/TelaAdmin";
import TelaCarrinho from "./src/telas/TelaCarrinho";
import TelaEditarProduto from "./src/telas/TelaEditarProduto";
import TelaAdicionarProduto from "./src/telas/TelaAdicionarProduto";


import { RotasPrincipais } from "./src/tipos/tiposRotas";
import { CarrinhoProvider } from "./src/contexto/CarrinhoContext";

const Stack = createNativeStackNavigator<RotasPrincipais>();

export default function App() {
  return (
    <CarrinhoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
          name="EditarProduto"
          component={TelaEditarProduto}
          options={{ title: "Editar Produto" }} />

          <Stack.Screen
            name="Login"
            component={TelaLogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Produtos"
            component={TelaProdutos}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetalhesProduto"
            component={TelaDetalhesProduto}
            options={{ title: "Detalhes do Produto" }}
          />
          <Stack.Screen
            name="BuscaProdutos"
            component={TelaBuscaProdutos}
            options={{ title: "Buscar Produtos" }}
          />
          <Stack.Screen
            name="Admin"
            component={TelaAdmin}
            options={{ title: "Painel do Administrador" }}
          />
          <Stack.Screen
            name="Carrinho"
            component={TelaCarrinho}
            options={{ title: "Carrinho de Compras" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CarrinhoProvider>
  );
}

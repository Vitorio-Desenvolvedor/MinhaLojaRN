import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaLogin from "./src/telas/TelaLogin";
import TelaProdutos from "./src/telas/TelaProdutos";
import TelaDetalhesProduto from "./src/telas/TelaDetalhesProduto";
import TelaBuscaProdutos from "./src/telas/TelaBuscaProdutos"; // Nova tela de busca
import { RotasPrincipais } from "./src/tipos/tiposRotas";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator<RotasPrincipais>();

export default function App() {
  const [logado, setLogado] = useState(false);

  // Função para quando o usuário fizer logout
  const logout = () => {
    setLogado(false);
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {!logado ? (
            <Stack.Screen name="Login">
              {(props) => <TelaLogin {...props} aoLogar={() => setLogado(true)} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Produtos">
                {(props) => <TelaProdutos {...props} aoLogout={logout} />}
              </Stack.Screen>

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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>

      <Toast />
    </>
  );
}

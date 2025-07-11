import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import TelaLogin from './src/telas/TelaLogin';
import TelaProdutos from './src/telas/TelaProdutos';

import { obterToken, removerToken } from './src/servicos/servicoArmazenamento';
import api from './src/api/axiosConfig'; // Axios já configurado com interceptores

export default function App() {
  // Estado para saber se o usuário está logado ou não
  const [autenticado, setAutenticado] = useState<boolean | null>(null);

  // Estado para saber se ainda estamos verificando o token
  const [carregandoInicial, setCarregandoInicial] = useState(true);

  // Roda uma vez ao abrir o app, para checar se já existe um token salvo
  useEffect(() => {
    const verificarAutenticacao = async () => {
      const token = await obterToken(); // tenta pegar o token salvo no dispositivo

      if (token) {
        // Se achou o token, já configura ele no Axios
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAutenticado(true); // usuário está logado
      } else {
        setAutenticado(false); // usuário não está logado
      }

      setCarregandoInicial(false); // terminou a verificação
    };

    verificarAutenticacao();

    // O interceptor de resposta já foi configurado no axiosConfig.ts
    // Ele cuida de apagar o token se ele estiver inválido
  }, []);

  // Função que será chamada quando o usuário clicar em “Sair”
  const lidarComLogout = async () => {
    await removerToken(); // apaga o token do armazenamento
    delete api.defaults.headers.common['Authorization']; // remove o token do Axios
    setAutenticado(false); // volta para a tela de login
  };

  // Enquanto está verificando se o usuário está logado, mostra um carregando
  if (carregandoInicial) {
    return (
      <View style={estilos.containerCentral}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Se o usuário está autenticado, mostra a tela de produtos
  if (autenticado) {
    return <TelaProdutos aoLogout={lidarComLogout} />;
  }

  // Senão, mostra a tela de login
  return <TelaLogin aoLoginSucesso={() => setAutenticado(true)} />;
}

// Estilo do carregamento
const estilos = StyleSheet.create({
  containerCentral: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

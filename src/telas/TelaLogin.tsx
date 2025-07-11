import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { realizarLogin } from '../servicos/servicoAutenticacao';
import { salvarToken } from '../servicos/servicoArmazenamento';

// Props que vem do App.tsx para avisar quando o login foi bem-sucedido
interface TelaLoginProps {
  aoLoginSucesso: () => void;
}

export default function TelaLogin({ aoLoginSucesso }: TelaLoginProps) {
  // Armazena o que o usuário digita
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  
  // Mostra um loading enquanto faz o login
  const [carregando, setCarregando] = useState(false);
  
  // Mostra uma mensagem de erro, se houver
  const [mensagemErro, setMensagemErro] = useState('');

  // Função chamada quando o botão "Entrar" é pressionado
  const lidarComLogin = async () => {
    setCarregando(true);        // Mostra o spinner
    setMensagemErro('');        // Limpa mensagens antigas

    try {
      // Envia os dados para a API
      const resposta = await realizarLogin({
        usuario: nomeUsuario,
        senha: senhaUsuario
      });

      // Salva o token localmente
      await salvarToken(resposta.token);

      // Avisa o App.tsx que o login deu certo
      aoLoginSucesso();
    } catch (erro: any) {
      // Mostra a mensagem de erro
      setMensagemErro(erro.message || 'Erro inesperado. Tente novamente.');
    } finally {
      setCarregando(false); 
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Login</Text>

      {/* Campo do nome de usuário */}
      <TextInput
        style={estilos.input}
        placeholder="Nome de Usuário"
        value={nomeUsuario}
        onChangeText={setNomeUsuario}
        autoCapitalize="none"
      />

      {/* Campo da senha */}
      <TextInput
        style={estilos.input}
        placeholder="Senha"
        value={senhaUsuario}
        onChangeText={setSenhaUsuario}
        secureTextEntry
      />

      {/* Mostra um spinner enquanto está carregando */}
      {carregando ? (
        <ActivityIndicator size="large" />
      ) : (
        <TouchableOpacity
          style={estilos.botao}
          onPress={lidarComLogin}
          disabled={!nomeUsuario || !senhaUsuario} // botão só funciona se os dois campos estiverem preenchidos
        >
          <Text style={estilos.textoBotao}>Entrar</Text>
        </TouchableOpacity>
      )}

      {/* Mostra erro, se houver */}
      {mensagemErro ? <Text style={estilos.mensagemErro}>{mensagemErro}</Text> : null}
    </View>
  );
}

// Estilo da tela
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10
  },
  botao: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  textoBotao: {
    fontSize: 16
  },
  mensagemErro: {
    marginTop: 15, 
    textAlign: 'center',
    color: 'red'
  },
});

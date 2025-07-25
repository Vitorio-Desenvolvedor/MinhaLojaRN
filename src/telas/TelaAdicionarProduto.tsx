import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RotasPrincipais } from "../tipos/tiposRotas";

// Navegação tipada
type NavegacaoProps = NativeStackNavigationProp<RotasPrincipais, "AdicionarProduto">;

export default function TelaAdicionarProduto() {
  const navegacao = useNavigation<NavegacaoProps>();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState("");

  const cadastrarProduto = () => {
    if (!titulo || !descricao || !preco || !categoria || !imagem) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    // Aqui você pode futuramente enviar para uma API
    Alert.alert("Sucesso", "Produto cadastrado com sucesso! (simulado)");
    navegacao.goBack();
  };

  return (
    <ScrollView style={estilos.container}>
      <Text style={estilos.titulo}>Novo Produto</Text>

      <Text style={estilos.label}>Título:</Text>
      <TextInput
        style={estilos.input}
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={estilos.label}>Descrição:</Text>
      <TextInput
        style={estilos.input}
        multiline
        numberOfLines={4}
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={estilos.label}>Preço:</Text>
      <TextInput
        style={estilos.input}
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
      />

      <Text style={estilos.label}>Categoria:</Text>
      <TextInput
        style={estilos.input}
        value={categoria}
        onChangeText={setCategoria}
      />

      <Text style={estilos.label}>Imagem (URL):</Text>
      <TextInput
        style={estilos.input}
        value={imagem}
        onChangeText={setImagem}
      />

      <TouchableOpacity style={estilos.botao} onPress={cadastrarProduto}>
        <Text style={estilos.textoBotao}>Cadastrar Produto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

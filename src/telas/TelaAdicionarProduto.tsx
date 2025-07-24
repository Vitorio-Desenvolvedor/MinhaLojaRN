import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TelaAdicionarProduto() {
  const navegacao = useNavigation();

  const [titulo, setTitulo] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");

  const cadastrarProduto = () => {
    if (!titulo || !preco || !categoria || !descricao || !imagem) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

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

      <Text style={estilos.label}>Preço:</Text>
      <TextInput
        style={estilos.input}
        value={preco}
        onChangeText={setPreco}
        keyboardType="decimal-pad"
      />

      <Text style={estilos.label}>Categoria:</Text>
      <TextInput
        style={estilos.input}
        value={categoria}
        onChangeText={setCategoria}
      />

      <Text style={estilos.label}>Descrição:</Text>
      <TextInput
        style={estilos.input}
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
      />

      <Text style={estilos.label}>URL da Imagem:</Text>
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
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: "#2980b9",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

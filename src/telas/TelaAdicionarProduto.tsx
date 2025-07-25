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
import { criarProduto } from "../servicos/servicoProdutos";

type Nav = NativeStackNavigationProp<RotasPrincipais, "AdicionarProduto">;

export default function TelaAdicionarProduto() {
  const navegacao = useNavigation<Nav>();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState("");

  const cadastrar = async () => {
    if (!titulo || !descricao || !categoria || !imagem || !preco) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    const precoNumber = Number(preco);
    if (Number.isNaN(precoNumber) || precoNumber <= 0) {
      Alert.alert("Atenção", "Preço inválido.");
      return;
    }

    try {
      await criarProduto({
        title: titulo,
        description: descricao,
        image: imagem,
        category: categoria,
        price: precoNumber,
      } as any); // a API fake aceita esse shape

      Alert.alert("Sucesso", "Produto cadastrado (simulado)!");
      navegacao.goBack();
    } catch (e: any) {
      Alert.alert("Erro", e.message || "Falha ao cadastrar.");
    }
  };

  return (
    <ScrollView style={estilos.container}>
      <Text style={estilos.titulo}>Novo Produto</Text>

      <Text style={estilos.label}>Título:</Text>
      <TextInput style={estilos.input} value={titulo} onChangeText={setTitulo} />

      <Text style={estilos.label}>Descrição:</Text>
      <TextInput
        style={estilos.input}
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <Text style={estilos.label}>Preço:</Text>
      <TextInput
        style={estilos.input}
        value={preco}
        onChangeText={setPreco}
        keyboardType="decimal-pad"
      />

      <Text style={estilos.label}>Categoria:</Text>
      <TextInput style={estilos.input} value={categoria} onChangeText={setCategoria} />

      <Text style={estilos.label}>Imagem (URL):</Text>
      <TextInput style={estilos.input} value={imagem} onChangeText={setImagem} />

      <TouchableOpacity style={estilos.botao} onPress={cadastrar}>
        <Text style={estilos.textoBotao}>Cadastrar Produto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#fff" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 15,
  },
  botao: {
    backgroundColor: "#35b929ff", padding: 15, borderRadius: 5, alignItems: "center",
  },
  textoBotao: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

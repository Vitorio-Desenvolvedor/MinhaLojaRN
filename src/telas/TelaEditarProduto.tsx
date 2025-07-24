import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { obterProdutoPorId } from "../servicos/servicoProdutos";
import { ProdutoAPI } from "../tipos/api";

type ParametrosRota = {
  produtoId: number;
};

export default function TelaEditarProduto() {
  const rota = useRoute();
  const navegacao = useNavigation();
  const { produtoId } = rota.params as ParametrosRota;

  const [produto, setProduto] = useState<ProdutoAPI | null>(null);
  const [carregando, setCarregando] = useState(true);

  const [titulo, setTitulo] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const carregar = async () => {
      setCarregando(true);
      try {
        const dados = await obterProdutoPorId(produtoId);
        setProduto(dados);
        setTitulo(dados.title);
        setPreco(dados.price.toString());
        setCategoria(dados.category);
        setDescricao(dados.description);
      } catch (erro) {
        Alert.alert("Erro", "Produto não encontrado.");
        navegacao.goBack();
      } finally {
        setCarregando(false);
      }
    };

    carregar();
  }, [produtoId]);

  const salvarEdicao = () => {
    Alert.alert("Sucesso", "Produto editado (simulação).");
    navegacao.goBack();
  };

  if (carregando || !produto) {
    return (
      <View style={estilos.container}>
        <ActivityIndicator size="large" />
        <Text>Carregando produto...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={estilos.container}>
      <Text style={estilos.titulo}>Editar Produto</Text>

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

      <TouchableOpacity style={estilos.botao} onPress={salvarEdicao}>
        <Text style={estilos.textoBotao}>Salvar Alterações</Text>
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
    backgroundColor: "#27ae60",
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

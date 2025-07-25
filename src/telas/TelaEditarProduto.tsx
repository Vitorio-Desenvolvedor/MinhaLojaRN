import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ProdutoAPI } from "../tipos/api";
import { obterProdutoPorId, atualizarProduto } from "../servicos/servicoProdutos";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RotasPrincipais } from "../tipos/tiposRotas";

type RotaParams = {
  produtoId: number;
};

type Nav = NativeStackNavigationProp<RotasPrincipais, "EditarProduto">;

export default function TelaEditarProduto() {
  const rota = useRoute();
  const navegacao = useNavigation<Nav>();
  const { produtoId } = rota.params as RotaParams;

  const [produto, setProduto] = useState<ProdutoAPI | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await obterProdutoPorId(produtoId);
        setProduto(dados);
        setTitulo(dados.title);
        setDescricao(dados.description);
        setPreco(String(dados.price));
        setCategoria(dados.category);
        setImagem(dados.image);
      } catch (e: any) {
        Alert.alert("Erro", e.message || "Erro ao carregar produto.");
      }
    };
    carregar();
  }, [produtoId]);

  const salvarAlteracoes = async () => {
    try {
      if (!titulo || !descricao || !categoria || !imagem || !preco) {
        Alert.alert("Atenção", "Preencha todos os campos.");
        return;
      }

      const precoNumber = Number(preco);
      if (Number.isNaN(precoNumber) || precoNumber <= 0) {
        Alert.alert("Atenção", "Preço inválido.");
        return;
      }

      await atualizarProduto(produtoId, {
        title: titulo,
        description: descricao,
        category: categoria,
        image: imagem,
        price: precoNumber,
      });

      Alert.alert("Sucesso", "Produto atualizado (simulado)!");
      navegacao.goBack();
    } catch (e: any) {
      Alert.alert("Erro", e.message || "Falha ao atualizar produto.");
    }
  };

  if (!produto) {
    return (
      <View style={estilos.containerCentral}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={estilos.container}>
      <Text style={estilos.titulo}>Editar Produto</Text>

      <Text style={estilos.label}>Título</Text>
      <TextInput style={estilos.input} value={titulo} onChangeText={setTitulo} />

      <Text style={estilos.label}>Descrição</Text>
      <TextInput
        style={estilos.input}
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <Text style={estilos.label}>Preço</Text>
      <TextInput
        style={estilos.input}
        value={preco}
        onChangeText={setPreco}
        keyboardType="decimal-pad"
      />

      <Text style={estilos.label}>Categoria</Text>
      <TextInput style={estilos.input} value={categoria} onChangeText={setCategoria} />

      <Text style={estilos.label}>Imagem (URL)</Text>
      <TextInput style={estilos.input} value={imagem} onChangeText={setImagem} />

      <TouchableOpacity style={estilos.botao} onPress={salvarAlteracoes}>
        <Text style={estilos.textoBotao}>Salvar alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#fff" },
  containerCentral: { flex: 1, justifyContent: "center", alignItems: "center" },
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

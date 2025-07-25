import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { obterTodosProdutos } from "../servicos/servicoProdutos";
import { ProdutoAPI } from "../tipos/api";
import { RotasPrincipais } from "../tipos/tiposRotas";

// Tipo da navegação
type NavegacaoProps = NativeStackNavigationProp<RotasPrincipais, "Admin">;

export default function TelaAdmin() {
  const navegacao = useNavigation<NavegacaoProps>();

  const [produtos, setProdutos] = useState<ProdutoAPI[]>([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const lista = await obterTodosProdutos();
        setProdutos(lista);
      } catch (e) {
        Alert.alert("Erro", "Não foi possível carregar os produtos.");
      }
    };
    carregar();
  }, []);

  const excluirProduto = (id: number) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este produto?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setProdutos((produtos) =>
              produtos.filter((produto) => produto.id !== id)
            );
          },
        },
      ]
    );
  };

  const renderizarItem = ({ item }: { item: ProdutoAPI }) => (
    <View style={estilos.itemProduto}>
      <Text style={estilos.tituloProduto}>{item.title}</Text>
      <View style={estilos.botoes}>
        <TouchableOpacity
          style={estilos.botaoEditar}
          onPress={() =>
            navegacao.navigate("EditarProduto", { produtoId: item.id }) // ✅ corrigido tipo aqui
          }
        >
          <Text style={estilos.textoBotao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={estilos.botaoExcluir}
          onPress={() => excluirProduto(item.id)}
        >
          <Text style={estilos.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Administração de Produtos</Text>

      <TouchableOpacity
        onPress={() => navegacao.navigate("AdicionarProduto")}
        style={estilos.botaoNovo}
      >
        <Text style={estilos.textoBotao}>+ Novo Produto</Text>
      </TouchableOpacity>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderizarItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  itemProduto: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tituloProduto: {
    fontSize: 16,
    marginBottom: 10,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
  },
  botaoEditar: {
    backgroundColor: "#2980b9",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  botaoExcluir: {
    backgroundColor: "#c0392b",
    padding: 8,
    borderRadius: 5,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  botaoNovo: {
    backgroundColor: "#35b929ff",
    padding: 12,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
});

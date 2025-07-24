import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProdutoAPI } from "../tipos/api";
import { obterTodosProdutos } from "../servicos/servicoProdutos";

export default function TelaAdmin() {
  const [produtos, setProdutos] = useState<ProdutoAPI[]>([]);
  const [carregando, setCarregando] = useState(true);
  const navegacao = useNavigation();

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const resultado = await obterTodosProdutos();
        setProdutos(resultado);
      } catch (error) {
        console.error("Erro ao carregar produtos", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarProdutos();
  }, []);

  const excluirProduto = (id: number) => {
    Alert.alert("Excluir produto", "Tem certeza que deseja excluir?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          // Simula exclusão removendo da lista local
          const novaLista = produtos.filter((p) => p.id !== id);
          setProdutos(novaLista);
        },
      },
    ]);
  };

  const editarProduto = (produtoId: number) => {
    // Simula navegação para tela de edição (ainda será criada)
    navegacao.navigate("EditarProduto", { produtoId });
  };
<TouchableOpacity
  onPress={() => navegacao.navigate("AdicionarProduto")}
  style={{ backgroundColor: "#3498db", padding: 10, borderRadius: 5, marginBottom: 15 }}
>
  <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
    + Novo Produto
  </Text>
</TouchableOpacity>

  const renderizarItem = ({ item }: { item: ProdutoAPI }) => (
    <View style={estilos.itemProduto}>
      <View style={{ flex: 1 }}>
        <Text style={estilos.titulo}>{item.title}</Text>
        <Text style={estilos.preco}>R$ {item.price.toFixed(2)}</Text>
        <Text style={estilos.categoria}>{item.category}</Text>
      </View>

      <View style={estilos.botoesAcoes}>
        <TouchableOpacity
          style={[estilos.botao, estilos.botaoEditar]}
          onPress={() => editarProduto(item.id)}
        >
          <Text style={estilos.textoBotao}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.botao, estilos.botaoExcluir]}
          onPress={() => excluirProduto(item.id)}
        >
          <Text style={estilos.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={estilos.container}>
      <Text style={estilos.tituloPagina}>Painel do Administrador</Text>

      {carregando ? (
        <Text>Carregando produtos...</Text>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderizarItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  tituloPagina: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemProduto: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  preco: {
    fontSize: 14,
    color: "#888",
  },
  categoria: {
    fontSize: 12,
    color: "#555",
  },
  botoesAcoes: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  botao: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  botaoEditar: {
    backgroundColor: "#3498db",
  },
  botaoExcluir: {
    backgroundColor: "#e74c3c",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

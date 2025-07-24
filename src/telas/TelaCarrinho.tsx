import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useCarrinho } from "../contexto/CarrinhoContext";

// Tela do carrinho de compras
export default function TelaCarrinho() {
  const { itensCarrinho, removerDoCarrinho, limparCarrinho } = useCarrinho();

  const total = itensCarrinho.reduce((soma, item) => soma + item.price, 0);

  const confirmarFinalizarCompra = () => {
    Alert.alert(
      "Compra Finalizada",
      `Sua compra de R$ ${total.toFixed(2)} foi concluída com sucesso!`,
      [
        {
          text: "OK",
          onPress: () => {
            limparCarrinho();
          },
        },
      ]
    );
  };

  const renderizarItem = ({ item }: any) => (
    <View style={estilos.item}>
      <Image source={{ uri: item.image }} style={estilos.imagem} />
      <View style={{ flex: 1 }}>
        <Text style={estilos.nome}>{item.title}</Text>
        <Text style={estilos.preco}>R$ {item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={estilos.botaoRemover}
        onPress={() => removerDoCarrinho(item.id)}
      >
        <Text style={estilos.textoRemover}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Carrinho de Compras</Text>

      {itensCarrinho.length === 0 ? (
        <Text style={estilos.vazio}>Seu carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={itensCarrinho}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderizarItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <View style={estilos.totalContainer}>
            <Text style={estilos.totalTexto}>Total: R$ {total.toFixed(2)}</Text>
            <TouchableOpacity
              style={estilos.botaoFinalizar}
              onPress={confirmarFinalizarCompra}
            >
              <Text style={estilos.textoFinalizar}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  vazio: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#888",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  imagem: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  preco: {
    fontSize: 14,
    color: "#555",
  },
  botaoRemover: {
    backgroundColor: "#e74c3c",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginLeft: 10,
  },
  textoRemover: {
    color: "#fff",
    fontWeight: "bold",
  },
  totalContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  totalTexto: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  botaoFinalizar: {
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  textoFinalizar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

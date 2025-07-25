import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";

type ItemCarrinho = {
  id: number;
  title: string;
  price: number;
  quantidade: number;
};

export default function TelaCarrinho() {
  // Simulação local
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const total = itens.reduce((acc, item) => acc + item.price * item.quantidade, 0);

  const remover = (id: number) => {
    setItens((lista) => lista.filter((i) => i.id !== id));
  };

  const finalizar = () => {
    if (itens.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione itens antes de finalizar.");
      return;
    }
    Alert.alert("Sucesso", "Compra finalizada (simulada)!");
    setItens([]);
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Carrinho</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={{ textAlign: "center" }}>Seu carrinho está vazio.</Text>}
        renderItem={({ item }) => (
          <View style={estilos.item}>
            <Text style={estilos.nome}>{item.title}</Text>
            <Text>Qtd: {item.quantidade}</Text>
            <Text>R$ {(item.price * item.quantidade).toFixed(2)}</Text>

            <TouchableOpacity onPress={() => remover(item.id)} style={estilos.botaoRemover}>
              <Text style={estilos.textoRemover}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={estilos.resumo}>
        <Text style={estilos.total}>Total: R$ {total.toFixed(2)}</Text>
        <TouchableOpacity style={estilos.botaoFinalizar} onPress={finalizar}>
          <Text style={estilos.textoFinalizar}>Finalizar compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 15 },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  item: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  nome: { fontWeight: "bold", marginBottom: 6 },
  botaoRemover: {
    backgroundColor: "#c0392b",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 8,
  },
  textoRemover: { color: "#fff", fontWeight: "bold" },
  resumo: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  total: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  botaoFinalizar: {
    backgroundColor: "#35b929ff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  textoFinalizar: { color: "#fff", fontWeight: "bold" },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { ProdutoAPI } from "../tipos/api";
import { obterTodosProdutos } from "../servicos/servicoProdutos";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RotasPrincipais } from "../tipos/tiposRotas";

import debounce from "lodash.debounce";

type NavegacaoProps = NativeStackNavigationProp<RotasPrincipais, "BuscaProdutos">;

export default function TelaBuscaProdutos() {
  const navegacao = useNavigation<NavegacaoProps>();

  const [termo, setTermo] = useState(""); // texto da busca
  const [produtos, setProdutos] = useState<ProdutoAPI[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // Função que realiza a busca com atraso (debounce de 500ms)
  const debouncedBuscar = debounce(async (texto: string) => {
    setCarregando(true);
    setErro("");
    setProdutos([]);

    try {
      const todosProdutos = await obterTodosProdutos();

      const filtrados = todosProdutos.filter((p) =>
        p.title.toLowerCase().includes(texto.toLowerCase()) ||
        p.category.toLowerCase().includes(texto.toLowerCase())
      );

      setProdutos(filtrados);
    } catch (e: any) {
      setErro(e.message || "Erro ao buscar produtos.");
    } finally {
      setCarregando(false);
    }
  }, 500); // espera 500ms após digitação

  // Cada produto da lista
  const renderizarProduto = ({ item }: { item: ProdutoAPI }) => (
    <TouchableOpacity
      style={estilos.item}
      onPress={() => navegacao.navigate("DetalhesProduto", { produtoId: item.id })}
    >
      <Image source={{ uri: item.image }} style={estilos.imagem} />
      <View style={estilos.info}>
        <Text style={estilos.titulo}>{item.title}</Text>
        <Text>{item.category}</Text>
        <Text style={estilos.preco}>R$ {item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.input}
        placeholder="Digite um termo para buscar"
        value={termo}
        onChangeText={(texto) => {
          setTermo(texto);
          debouncedBuscar(texto); // chama busca com atraso
        }}
      />

      {carregando && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      {erro !== "" && <Text style={estilos.erro}>{erro}</Text>}

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderizarProduto}
        contentContainerStyle={{ marginTop: 20 }}
      />
    </View>
  );
}

// Estilos visuais da tela
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  imagem: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  preco: {
    color: "#2ecc71",
    marginTop: 4,
  },
  erro: {
    marginTop: 20,
    color: "red",
    textAlign: "center",
  },
});

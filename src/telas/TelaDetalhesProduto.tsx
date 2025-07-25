import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { obterProdutoPorId } from "../servicos/servicoProdutos";
import { ProdutoAPI } from "../tipos/api";

type DetalhesProdutoParams = {
  produtoId: number;
};

export default function TelaDetalhesProduto() {
  const rota = useRoute();
  const navegacao = useNavigation();
  const { produtoId } = rota.params as DetalhesProdutoParams;

  const [produto, setProduto] = useState<ProdutoAPI | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    const carregar = async () => {
      setCarregando(true);
      setMensagemErro("");
      try {
        const p = await obterProdutoPorId(produtoId);
        setProduto(p);
      } catch (e: any) {
        setMensagemErro(e.message || "Não foi possível carregar os detalhes.");
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, [produtoId]);

  if (carregando) {
    return (
      <View style={estilos.containerCentral}>
        <ActivityIndicator size="large" />
        <Text>Carregando detalhes do produto...</Text>
      </View>
    );
  }

  if (mensagemErro) {
    return (
      <View style={estilos.containerCentral}>
        <Text style={estilos.mensagemErro}>{mensagemErro}</Text>
        <TouchableOpacity
          style={estilos.botaoVoltar}
          onPress={() => navegacao.goBack()}
        >
          <Text style={estilos.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!produto) {
    return (
      <View style={estilos.containerCentral}>
        <Text>Produto não encontrado.</Text>
        <TouchableOpacity
          style={estilos.botaoVoltar}
          onPress={() => navegacao.goBack()}
        >
          <Text style={estilos.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={estilos.container}>
      <TouchableOpacity style={estilos.botaoVoltar} onPress={() => navegacao.goBack()}>
        <Text style={estilos.textoBotao}>{"< Voltar"}</Text>
      </TouchableOpacity>

      <Image source={{ uri: produto.image }} style={estilos.imagemProduto} />
      <Text style={estilos.titulo}>{produto.title}</Text>
      <Text style={estilos.preco}>R$ {produto.price.toFixed(2)}</Text>
      <Text style={estilos.categoria}>{produto.category}</Text>

      <Text style={estilos.descricaoTitulo}>Descrição:</Text>
      <Text style={estilos.descricao}>{produto.description}</Text>

      <View style={estilos.ratingContainer}>
        <Text style={estilos.ratingTexto}>
          Avaliação: {produto.rating.rate} ({produto.rating.count} votos)
        </Text>
      </View>
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
  containerCentral: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  botaoVoltar: {
    alignSelf: "flex-start",
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  textoBotao: {
    fontSize: 16,
    color: "#333",
  },
  imagemProduto: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  preco: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e67e22",
    marginBottom: 10,
  },
  categoria: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  descricaoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  descricao: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingTexto: {
    fontSize: 16,
    color: "#35b929ff",
    fontWeight: "bold",
  },
  mensagemErro: {
    textAlign: "center",
    marginBottom: 20,
    color: "red",
    fontSize: 16,
  },
});

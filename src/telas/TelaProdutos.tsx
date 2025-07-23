import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RotasPrincipais } from "../tipos/tiposRotas";

import { obterTodosProdutos } from "../servicos/servicoProdutos";
import { ProdutoAPI } from "../tipos/api";

// Props da tela
interface TelaProdutosProps {
  aoLogout: () => void;
}

type NavegacaoProps = NativeStackNavigationProp<RotasPrincipais, "Produtos">;

export default function TelaProdutos({ aoLogout }: TelaProdutosProps) {
  const navegacao = useNavigation<NavegacaoProps>();

  const [listaProdutos, setListaProdutos] = useState<ProdutoAPI[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<ProdutoAPI[]>([]);
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);
  const [mensagemErro, setMensagemErro] = useState("");
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    const carregarProdutos = async () => {
      setCarregandoProdutos(true);
      setMensagemErro("");

      try {
        const produtos = await obterTodosProdutos();
        setListaProdutos(produtos);
        setProdutosFiltrados(produtos);
      } catch (erro: any) {
        setMensagemErro(erro.message || "Erro ao buscar produtos.");
        if (erro.message.includes("Sessão expirada")) {
          aoLogout();
        }
      } finally {
        setCarregandoProdutos(false);
      }
    };

    carregarProdutos();
  }, [aoLogout]);

  useEffect(() => {
    if (termoBusca === "") {
      setProdutosFiltrados(listaProdutos);
    } else {
      const encontrados = listaProdutos.filter((p) =>
        p.title.toLowerCase().includes(termoBusca.toLowerCase()) ||
        p.category.toLowerCase().includes(termoBusca.toLowerCase())
      );
      setProdutosFiltrados(encontrados);
    }
  }, [termoBusca, listaProdutos]);

  const renderizarItemProduto = ({ item }: { item: ProdutoAPI }) => (
    <TouchableOpacity
      style={estilos.itemProduto}
      onPress={() =>
        navegacao.navigate("DetalhesProduto", { produtoId: item.id })
      }
    >
      <Image source={{ uri: item.image }} style={estilos.imagemProduto} />
      <View style={estilos.detalhesProduto}>
        <Text style={estilos.tituloProduto}>{item.title}</Text>
        <Text style={estilos.categoriaProduto}>{item.category}</Text>
        <Text style={estilos.precoProduto}>R$ {item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (carregandoProdutos) {
    return (
      <View style={estilos.containerCentral}>
        <ActivityIndicator size="large" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  if (mensagemErro) {
    return (
      <View style={estilos.containerCentral}>
        <Text style={estilos.mensagemErro}>{mensagemErro}</Text>
        <TouchableOpacity style={estilos.botaoLogout} onPress={aoLogout}>
          <Text style={estilos.textoBotao}>Fazer Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.tituloPagina}>Produtos</Text>

        <View style={estilos.botoesCabecalho}>
          <TouchableOpacity style={estilos.botaoBusca} onPress={() => navegacao.navigate("BuscaProdutos")}>
            <Text style={estilos.textoBotao}>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botaoLogout} onPress={aoLogout}>
            <Text style={estilos.textoBotao}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={estilos.inputBusca}
        placeholder="Pesquisar produtos nesta tela..."
        value={termoBusca}
        onChangeText={setTermoBusca}
      />

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderizarItemProduto}
        contentContainerStyle={estilos.listaConteudo}
      />
    </View>
  );
}

// Estilos
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  containerCentral: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  tituloPagina: {
    fontSize: 26,
  },
  botoesCabecalho: {
    flexDirection: "row",
    gap: 10,
  },
  botaoLogout: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#eee",
  },
  botaoBusca: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#d0f0ff",
  },
  textoBotao: {
    fontSize: 14,
  },
  inputBusca: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  itemProduto: {
    flexDirection: "row",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  imagemProduto: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  detalhesProduto: {
    flex: 1,
  },
  tituloProduto: {
    fontSize: 16,
    marginBottom: 5,
  },
  categoriaProduto: {
    fontSize: 12,
    marginBottom: 5,
    opacity: 0.7,
  },
  precoProduto: {
    fontSize: 15,
    fontWeight: "bold",
  },
  listaConteudo: {
    paddingBottom: 20,
  },
  mensagemErro: {
    textAlign: "center",
    marginBottom: 20,
    color: "red",
  },
});

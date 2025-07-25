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

import { obterTodosProdutos } from "../servicos/servicoProdutos";
import { ProdutoAPI } from "../tipos/api";
import { RotasPrincipais } from "../tipos/tiposRotas";

interface TelaProdutosProps {
  aoLogout: () => void;
}

type Nav = NativeStackNavigationProp<RotasPrincipais, "Produtos">;

export default function TelaProdutos({ aoLogout }: TelaProdutosProps) {
  const navegacao = useNavigation<Nav>();

  const [listaProdutos, setListaProdutos] = useState<ProdutoAPI[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<ProdutoAPI[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState("");
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    const carregar = async () => {
      setCarregando(true);
      setMensagemErro("");
      try {
        const produtos = await obterTodosProdutos();
        setListaProdutos(produtos);
        setProdutosFiltrados(produtos);
      } catch (erro: any) {
        setMensagemErro(erro.message || "Erro ao carregar produtos.");
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

  useEffect(() => {
    if (termoBusca.trim() === "") {
      setProdutosFiltrados(listaProdutos);
    } else {
      const encontrados = listaProdutos.filter((p) =>
        p.title.toLowerCase().includes(termoBusca.toLowerCase()) ||
        p.category.toLowerCase().includes(termoBusca.toLowerCase())
      );
      setProdutosFiltrados(encontrados);
    }
  }, [termoBusca, listaProdutos]);

  const renderItem = ({ item }: { item: ProdutoAPI }) => (
    <TouchableOpacity
      style={estilos.itemProduto}
      onPress={() => navegacao.navigate("DetalhesProduto", { produtoId: item.id })}
    >
      <Image source={{ uri: item.image }} style={estilos.imagemProduto} />
      <View style={estilos.detalhesProduto}>
        <Text style={estilos.tituloProduto}>{item.title}</Text>
        <Text style={estilos.categoriaProduto}>{item.category}</Text>
        <Text style={estilos.precoProduto}>R$ {item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (carregando) {
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
        <Text style={{ color: "red" }}>{mensagemErro}</Text>
        <TouchableOpacity style={estilos.botaoLogout} onPress={aoLogout}>
          <Text style={estilos.textoBotao}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.tituloPagina}>Produtos</Text>

        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            style={estilos.botaoHeader}
            onPress={() => navegacao.navigate("BuscaProdutos")}
          >
            <Text style={estilos.textoBotaoHeader}>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={estilos.botaoHeader}
          onPress={() => navegacao.navigate("Carrinho")}
          >
            <Text style={estilos.textoBotaoHeader}>Carrinho</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={estilos.botaoHeader}
            onPress={() => navegacao.navigate("Admin")}
          >
            <Text style={estilos.textoBotaoHeader}>Admin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botaoHeader} onPress={aoLogout}>
            <Text style={estilos.textoBotaoHeader}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={estilos.inputBusca}
        placeholder="Pesquisar produtos..."
        value={termoBusca}
        onChangeText={setTermoBusca}
      />

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={estilos.listaConteudo}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 10 },
  containerCentral: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  cabecalho: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  tituloPagina: { fontSize: 26 },
  botaoLogout: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5 },
  textoBotao: { fontSize: 14 },
  inputBusca: { width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 15 },
  itemProduto: { flexDirection: "row", padding: 15, borderWidth: 1, borderColor: "#eee", borderRadius: 8, marginBottom: 10, alignItems: "center" },
  imagemProduto: { width: 60, height: 60, borderRadius: 5, marginRight: 15 },
  detalhesProduto: { flex: 1 },
  tituloProduto: { fontSize: 16, marginBottom: 5 },
  categoriaProduto: { fontSize: 12, marginBottom: 5, opacity: 0.7 },
  precoProduto: { fontSize: 15, fontWeight: "bold" },
  listaConteudo: { paddingBottom: 20 },
  botaoHeader: {
    backgroundColor: "#35b929ff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  textoBotaoHeader: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});

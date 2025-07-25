import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ProdutoAPI } from "../tipos/api";
import { obterTodosProdutos } from "../servicos/servicoProdutos";
import debounce from "lodash.debounce";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RotasPrincipais } from "../tipos/tiposRotas";

type Nav = NativeStackNavigationProp<RotasPrincipais, "BuscaProdutos">;

export default function TelaBuscaProdutos() {
  const navegacao = useNavigation<Nav>();

  const [termo, setTermo] = useState("");
  const [produtos, setProdutos] = useState<ProdutoAPI[]>([]);
  const [resultado, setResultado] = useState<ProdutoAPI[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      setCarregando(true);
      try {
        const lista = await obterTodosProdutos();
        setProdutos(lista);
        setResultado(lista);
      } catch (e) {
        //
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

  const filtrar = (texto: string) => {
    if (!texto) {
      setResultado(produtos);
      return;
    }

    const filtro = produtos.filter(
      (p) =>
        p.title.toLowerCase().includes(texto.toLowerCase()) ||
        p.category.toLowerCase().includes(texto.toLowerCase())
    );
    setResultado(filtro);
  };

  const debouncedFiltrar = useMemo(() => debounce(filtrar, 300), [produtos]);

  const onChangeTermo = (texto: string) => {
    setTermo(texto);
    debouncedFiltrar(texto);
  };

  const renderItem = ({ item }: { item: ProdutoAPI }) => (
    <TouchableOpacity
      style={estilos.item}
      onPress={() => navegacao.navigate("DetalhesProduto", { produtoId: item.id })}
    >
      <Image source={{ uri: item.image }} style={estilos.imagem} />
      <View style={{ flex: 1 }}>
        <Text style={estilos.titulo}>{item.title}</Text>
        <Text style={estilos.categoria}>{item.category}</Text>
        <Text style={estilos.preco}>R$ {item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (carregando) {
    return (
      <View style={estilos.central}>
        <ActivityIndicator size="large" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.input}
        placeholder="Digite para buscar..."
        value={termo}
        onChangeText={onChangeTermo}
      />

      <FlatList
        data={resultado}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 15, backgroundColor: "#fff" },
  central: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10, marginBottom: 15,
  },
  item: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  imagem: {
    width: 60, height: 60, marginRight: 12, borderRadius: 4,
  },
  titulo: { fontWeight: "bold" },
  categoria: { color: "#555", marginVertical: 4 },
  preco: { color: "#000000ff", fontWeight: "bold" },
});

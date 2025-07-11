import api from '../api/axiosConfig';
import { ProdutoAPI } from '../tipos/api';

// Busca todos os produtos da API
export async function obterTodosProdutos(): Promise<ProdutoAPI[]> {
  try {
    const resposta = await api.get<ProdutoAPI[]>('products'); // GET na API
    return resposta.data; // devolve a lista de produtos
  } catch (erro: any) {
    throw new Error(erro.message || 'Erro ao buscar produtos.');
  }
}

import api from "../api/axiosConfig";
import { ProdutoAPI } from "../tipos/api";

// GET /products
export async function obterTodosProdutos(): Promise<ProdutoAPI[]> {
  try {
    const resposta = await api.get<ProdutoAPI[]>("products");
    return resposta.data;
  } catch (erro: any) {
    throw new Error(erro.message || "Erro ao buscar produtos.");
  }
}

// GET /products/:id
export async function obterProdutoPorId(id: number): Promise<ProdutoAPI> {
  try {
    const resposta = await api.get<ProdutoAPI>(`products/${id}`);
    return resposta.data;
  } catch (erro: any) {
    if (erro.response && erro.response.status === 404) {
      throw new Error("Produto não encontrado.");
    }
    throw new Error(erro.message || "Erro ao buscar produto por ID.");
  }
}

// POST /products (simulado: a API fake retorna algo mas não persiste)
export async function criarProduto(
  dados: Omit<ProdutoAPI, "id" | "rating">
): Promise<ProdutoAPI> {
  try {
    const resposta = await api.post<ProdutoAPI>("products", dados);
    return resposta.data;
  } catch (erro: any) {
    throw new Error(erro.message || "Erro ao criar produto.");
  }
}

// PUT /products/:id (simulado)
export async function atualizarProduto(
  id: number,
  dados: Partial<Omit<ProdutoAPI, "id" | "rating">>
): Promise<ProdutoAPI> {
  try {
    const resposta = await api.put<ProdutoAPI>(`products/${id}`, dados);
    return resposta.data;
  } catch (erro: any) {
    throw new Error(erro.message || "Erro ao atualizar produto.");
  }
}

// DELETE /products/:id (simulado)
export async function excluirProduto(id: number): Promise<void> {
  try {
    await api.delete(`products/${id}`);
  } catch (erro: any) {
    throw new Error(erro.message || "Erro ao excluir produto.");
  }
}

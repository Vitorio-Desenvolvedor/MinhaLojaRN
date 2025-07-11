import axios from 'axios';
import { obterToken, removerToken } from '../servicos/servicoArmazenamento';

// Criando uma instância do Axios configurada para nossa API
const api = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptador antes de cada requisição: adiciona o token no cabeçalho
api.interceptors.request.use(async (config) => {
  const token = await obterToken(); // pega o token salvo no celular
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // coloca no cabeçalho
  }
  return config;
}, Promise.reject);

// Interceptador depois da resposta: verifica se o token deu erro
api.interceptors.response.use(
  res => res,
  async (erro) => {
    if (erro.response?.status === 401) {
      await removerToken(); // se o token for inválido, apaga ele
      console.warn('Token expirado. Faça login novamente.');
    }
    return Promise.reject(erro); // repassa o erro para quem chamou
  }
);

export default api; // exporta o Axios configurado

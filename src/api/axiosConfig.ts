import axios from "axios";
import { obterToken, removerToken } from "../servicos/servicoArmazenamento";

const api = axios.create({
  baseURL: "https://fakestoreapi.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adiciona token automaticamente
api.interceptors.request.use(
  async (config) => {
    const token = await obterToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (erro) => Promise.reject(erro)
);

// Lida com 401
api.interceptors.response.use(
  (res) => res,
  async (erro) => {
    if (erro.response && erro.response.status === 401) {
      await removerToken();
      console.warn("Token expirado/ inválido. Faça login novamente.");
    }
    return Promise.reject(erro);
  }
);

export default api;

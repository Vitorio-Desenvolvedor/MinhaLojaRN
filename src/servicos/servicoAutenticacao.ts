import api from "../api/axiosConfig";
import { CredenciaisLogin, RespostaLoginAPI } from "../tipos/api";

export async function realizarLogin(
  credenciais: CredenciaisLogin
): Promise<RespostaLoginAPI> {
  try {
    const resposta = await api.post<RespostaLoginAPI>("auth/login", {
      username: credenciais.usuario,
      password: credenciais.senha,
    });
    return resposta.data;
  } catch (erro: any) {
    if (erro.response && erro.response.status === 401) {
      throw new Error("Credenciais inválidas.");
    }
    throw new Error("Erro ao conectar no servidor. Tente novamente.");
  }
}

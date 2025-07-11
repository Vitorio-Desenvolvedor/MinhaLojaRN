import api from '../api/axiosConfig'; // usa a instância do axios já configurada
import { CredenciaisLogin, RespostaLoginAPI } from '../tipos/api';

// Faz o login com a API usando nome de usuário e senha
export async function realizarLogin(credenciais: CredenciaisLogin): Promise<RespostaLoginAPI> {
  try {
    // A API espera 'username' e 'password' no corpo da requisição
    const resposta = await api.post<RespostaLoginAPI>('auth/login', {
      username: credenciais.usuario,
      password: credenciais.senha,
    });

    // Se der certo, retorna o token que a API respondeu
    return resposta.data;
  } catch (erro: any) {
    // Se a senha estiver errada
    if (erro.response && erro.response.status === 401) {
      throw new Error('Credenciais inválidas. Verifique seu usuário e senha.');
    }

    // Erro geral (sem internet, API fora do ar, etc)
    throw new Error('Erro ao conectar com o servidor. Tente novamente mais tarde.');
  }
}

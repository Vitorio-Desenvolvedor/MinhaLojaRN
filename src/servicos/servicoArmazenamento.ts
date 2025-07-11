import AsyncStorage from '@react-native-async-storage/async-storage';

// Nome da "chave" onde o token será salvo no celular
const CHAVE_TOKEN = '@minhalojarn:token';

// Salva o token no armazenamento do dispositivo
export async function salvarToken(token: string) {
  await AsyncStorage.setItem(CHAVE_TOKEN, token);
}

// Recupera o token salvo anteriormente
export async function obterToken() {
  return await AsyncStorage.getItem(CHAVE_TOKEN);
}

// Apaga o token do armazenamento (quando o usuário faz logout)
export async function removerToken() {
  await AsyncStorage.removeItem(CHAVE_TOKEN);
}

import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_TOKEN = "@minhalojarn:token";

export async function salvarToken(token: string): Promise<void> {
  await AsyncStorage.setItem(CHAVE_TOKEN, token);
}

export async function obterToken(): Promise<string | null> {
  return AsyncStorage.getItem(CHAVE_TOKEN);
}

export async function removerToken(): Promise<void> {
  await AsyncStorage.removeItem(CHAVE_TOKEN);
}

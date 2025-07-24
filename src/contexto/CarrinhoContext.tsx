import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProdutoAPI } from "../tipos/api";

// Tipo dos dados que o contexto vai fornecer
interface CarrinhoContextProps {
  itensCarrinho: ProdutoAPI[];
  adicionarAoCarrinho: (produto: ProdutoAPI) => void;
  removerDoCarrinho: (idProduto: number) => void;
  limparCarrinho: () => void;
}

// Criamos o contexto (valor inicial é vazio)
const CarrinhoContext = createContext<CarrinhoContextProps | undefined>(undefined);

// Componente Provider que envolve o app
export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itensCarrinho, setItensCarrinho] = useState<ProdutoAPI[]>([]);

  const adicionarAoCarrinho = (produto: ProdutoAPI) => {
    setItensCarrinho((prev) => [...prev, produto]);
  };

  const removerDoCarrinho = (idProduto: number) => {
    setItensCarrinho((prev) => prev.filter((p) => p.id !== idProduto));
  };

  const limparCarrinho = () => {
    setItensCarrinho([]);
  };

  return (
    <CarrinhoContext.Provider
      value={{ itensCarrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

// Hook para facilitar uso do contexto
export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);
  if (!contexto) throw new Error("useCarrinho deve ser usado dentro de CarrinhoProvider");
  return contexto;
}

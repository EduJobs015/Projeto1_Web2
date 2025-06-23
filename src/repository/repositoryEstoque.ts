import { Estoque } from "../model/EstoqueBiblioteca";
import { Livro } from "../model/LivroBiblioteca";

export class EstoqueRepository {
  private static instance: EstoqueRepository;
  private estoqueList: Estoque[] = [];

  private constructor() {}

  static getInstance(): EstoqueRepository {
    if (!this.instance) {
      this.instance = new EstoqueRepository();
    }
    return this.instance;
  }

  adicionarEstoque(estoque: Estoque): void {
    this.estoqueList.push(estoque);
  }

  listarTodos(): Estoque[] {
  return this.estoqueList;
}

  buscarPorId(id: number): Estoque | undefined {
    return this.estoqueList.find(e => e.id === id);
  }

  atualizarEstoque(id: number, quantidade: number, quantidadeEmprestada: number): void {
  const estoque = this.buscarPorId(id);

  if (!estoque) {
    throw new Error("Estoque não encontrado.");
  }

  if (quantidade < 0 || quantidadeEmprestada < 0) {
    throw new Error("Valores inválidos.");
  }

  if (quantidadeEmprestada > quantidade) {
    throw new Error("Quantidade emprestada não pode ser maior que a quantidade total.");
  }

  estoque.quantidade = quantidade;
  estoque.quantidade_emprestada = quantidadeEmprestada;
  estoque.disponibilidade = quantidade > quantidadeEmprestada;
}

  remover(id: number): void {
    const index = this.estoqueList.findIndex(e => e.id === id);
    if (index === -1) throw new Error("Estoque não encontrado.");

    if (this.estoqueList[index].quantidade_emprestada > 0) {
      throw new Error("Exemplar emprestado — não pode ser removido.");
    }

    this.estoqueList.splice(index, 1);
  }
}

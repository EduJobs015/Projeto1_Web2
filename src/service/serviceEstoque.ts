import { Livro } from "../model/LivroBiblioteca";
import { Estoque } from "../model/EstoqueBiblioteca";
import { EstoqueRepository } from "../repository/repositoryEstoque";

export class EstoqueService {
  private repository = EstoqueRepository.getInstance();

  criarEstoque(quantidade: number, quantidadeEmprestada: number, livro: Livro): Estoque {
  if (!livro) {
      throw new Error("Livro é obrigatório.");
    }

    if (quantidade < 0 || quantidadeEmprestada < 0) {
      throw new Error("Quantidade e quantidade emprestada não podem ser negativas.");
    }

    if (quantidadeEmprestada > quantidade) {
      throw new Error("Quantidade emprestada não pode ser maior que a quantidade total.");
    }

    const estoqueExistente = this.repository.listarDisponiveis().find(e => e.quantidade_emprestada === quantidadeEmprestada);

    if (estoqueExistente) {
      throw new Error("Já existe um exemplar com essa quantidade emprestada para esse livro.");
    }

    const estoque = new Estoque(quantidade, quantidadeEmprestada, livro);
    this.repository.adicionarEstoque(estoque);
    return estoque;
}

  listarDisponiveis(): Estoque[] {
    return this.repository.listarDisponiveis();
  }

  buscarPorId(id: number): Estoque {
    const est = this.repository.buscarPorId(id);
    if (!est) throw new Error("livro não encontrado.");
    return est;
  }

  atualizar(id: number, quantidade: number, quantidadeEmprestada: number): void {
    this.repository.atualizarEstoque(id, quantidade, quantidadeEmprestada);
  }

  remover(id: number): void {
    this.repository.remover(id);
  }
}

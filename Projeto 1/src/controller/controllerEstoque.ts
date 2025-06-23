import { Request, Response } from "express";
import { LivroRepository } from "../repository/repositoryLivros";
import { EstoqueService } from "../service/serviceEstoque";

export class EstoqueController {
  private service = new EstoqueService();
  private livroRepo = LivroRepository.getInstance();

  criarEstoque = (req: Request, res: Response): void => {
    try {
      const { isbn, quantidade, quantidadeEmprestada } = req.body;

      const livro = this.livroRepo.todosLivros().find(l => l.isbn === isbn);
      if (!livro) throw new Error("Livro com o ISBN informado não foi encontrado.");

      const estoque = this.service.criarEstoque(
            quantidade,
            quantidadeEmprestada,
            livro
        );
      res.status(201).json(estoque);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  };

  listarDisponiveis = (res: Response): void => {
    try {
      const lista = this.service.listarTodos();
      if (lista.length === 0) {
        res.status(200).json({ mensagem: "Nenhum exemplar disponível." });
        return;
      }
      res.status(200).json(lista);
    } catch (error: any) {
      res.status(500).json({ erro: error.message });
    }
  };

  buscarPorId = (req: Request, res: Response): void => {
  try {
    const codigo = Number(req.params.codigo); // <-- ajustado
    const exemplar = this.service.buscarPorId(codigo);

    res.status(200).json(exemplar); // já retorna no formato esperado
  } catch (error: any) {
    res.status(404).json({ erro: error.message });
  }
};

  atualizarEstoque = (req: Request, res: Response): void => {
    try {
      const id = Number(req.params.codigo);
      const { quantidade, quantidadeEmprestada } = req.body;
      this.service.atualizar(id, quantidade, quantidadeEmprestada);
      res.status(200).json({ mensagem: "Estoque atualizado com sucesso!" });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  };

  removerEstoque = (req: Request, res: Response): void => {
    try {
      const id = Number(req.params.codigo);
      this.service.remover(id);
      res.status(200).json({ mensagem: "Estoque removido com sucesso!" });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  };
}

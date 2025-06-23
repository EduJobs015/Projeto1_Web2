import { Request, Response } from "express";
import { EmprestimoService } from "../service/serviceEmprestimo";
import { UsuarioRepository } from "../repository/repositoryUsuario";
import { EstoqueRepository } from "../repository/repositoryEstoque";

export class EmprestimoController {
  private service = new EmprestimoService();

  realizarEmprestimo = (req: Request, res: Response): void => {
    try {
      const { cpf, idEstoque } = req.body;

      const usuario = UsuarioRepository.getInstance().buscarPorCpf(cpf);
      const estoque = EstoqueRepository.getInstance().buscarPorId(Number(idEstoque));

      if (!usuario) throw new Error("Usuário não encontrado.");
      if (!estoque) throw new Error("Livro não encontrado.");

      const emprestimo = this.service.realizarEmprestimo(usuario, estoque);
      res.status(201).json(emprestimo);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  };

  listarTodos = (req: Request, res: Response): void => {
    try {
      const lista = this.service.listarTodos();
      res.status(200).json(lista);
    } catch (error: any) {
      res.status(500).json({ erro: error.message });
    }
  };

  buscarPorId = (req: Request, res: Response): void => {
    try {
      const id = Number(req.params.id);
      const emprestimo = this.service.buscarPorId(id);
      res.status(200).json(emprestimo);
    } catch (error: any) {
      res.status(404).json({ erro: error.message });
    }
  };

  registrarDevolucao = (req: Request, res: Response): void => {
  try {
    const id = Number(req.params.id);
    this.service.registrarDevolucao(id);
    res.status(200).json({ mensagem: "Livro devolvido com sucesso!" });
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
};
}

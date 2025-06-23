import { Request, Response } from "express";
import { UsuarioService } from "../service/serviceUsuario";
import { CategoriaUsuario } from "../model/CatergoriaUsuario";
import { Cursos } from "../model/CursoUsuario";

export class UsuarioController {
  private service = new UsuarioService();

  criarUsuario = (req: Request, res: Response): void => {
    try {
      const { nome, cpf, categoria, curso } = req.body;
      const categoriaObj = new CategoriaUsuario(categoria);
      const cursoObj = new Cursos(curso);

      const novo = this.service.criar(nome, cpf, categoriaObj, cursoObj);
      res.status(201).json(novo);
    } catch (e: any) {
      res.status(400).json({ erro: e.message });
    }
  };

  listarUsuarios = (_req: Request,res: Response): void => {
    try {
      const lista = this.service.listar();
      if (lista.length === 0) {
        res.status(200).json({ mensagem: "Nenhum usuário encontrado." });
      } else {
        res.status(200).json(lista);
      }
    } catch (e: any) {
      res.status(500).json({ erro: e.message });
    }
  };

  buscarUsuario = (req: Request, res: Response): void => {
    try {
      const cpf = req.params.cpf;
      const usuario = this.service.buscarPorCpf(cpf);
      res.status(200).json(usuario);
    } catch (e: any) {
      res.status(404).json({ erro: e.message });
    }
  };

  atualizarUsuario = (req: Request, res: Response): void => {
    try {
      const cpf = req.params.cpf;
      this.service.atualizar(cpf, req.body);
      res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
    } catch (e: any) {
      res.status(400).json({ erro: e.message });
    }
  };

  deletarUsuario = (req: Request, res: Response): void => {
    try {
      const cpf = req.params.cpf;
      const possuiEmprestimos = false; // simulação — insira verificação real depois
      this.service.remover(cpf, possuiEmprestimos);
      res.status(200).json({ mensagem: "Usuário removido com sucesso!" });
    } catch (e: any) {
      res.status(400).json({ erro: e.message });
    }
  };
}
import { Request, Response } from "express";
import { UsuarioService } from "../service/serviceUsuario";

export class UsuarioController {
  private usuarioService = new UsuarioService();

  criarUsuario = (req: Request, res: Response) => {
    try {
      const usuario = this.usuarioService.novoUsuario(req.body);
      res.status(201).json(usuario);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  listarUsuarios = (req: Request, res: Response) => {
    try {
      const usuarios = this.usuarioService.listaUsuario();
      res.json(usuarios);
    } catch (error: any) {
      res.status(500).json({ error: "Erro ao listar usuários." });
    }
  };

  atualizarUsuario = (req: Request, res: Response) => {
    try {
      const cpf = req.params.cpf;
      const data = req.body;

      
      this.usuarioService.atualizarUsuario(cpf, data);

      res.json({ message: "Usuário atualizado com sucesso." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  deletarUsuario = (req: Request, res: Response) => {
    try {
      const cpf = req.params.cpf;

      
      this.usuarioService.deletarUsuario(cpf);

      res.json({ message: "Usuário deletado com sucesso." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}

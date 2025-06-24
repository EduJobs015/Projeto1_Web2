import { Request, Response } from "express";
import { CategoriaService } from "../service/serviceCategorias";

export class CategoriaController {
  private service = new CategoriaService();

  getCategoriasUsuario = (_req: Request, res: Response) => {
    res.json(this.service.listarCategoriasUsuario());
  };

  getCategoriasLivro = (_req: Request, res: Response) => {
    res.json(this.service.listarCategoriasLivro());
  };

  getCursos = (_req: Request, res: Response) => {
    res.json(this.service.listarCursos());
  };
}

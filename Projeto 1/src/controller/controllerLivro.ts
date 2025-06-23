import { Request, Response } from "express";
import { LivroService } from "../service/serviceLivros";
import { CategoriaLivro } from "../model/CategoriaLivro";

export class LivroController {
  private livroService = new LivroService();

  criarLivro = (req: Request, res: Response): void => {
    try {
      const { titulo, autor, editora, edicao, isbn, categoriaNome } = req.body;

      if (!categoriaNome) {
        res.status(400).json({ erro: "Campo 'categoriaNome' é obrigatório." });
        return;
      }
      const categoria = new CategoriaLivro(categoriaNome);
      const livro = this.livroService.criarLivro(
        titulo,
        autor,
        editora,
        edicao,
        isbn,
        categoria
      );
      res.status(201).json(livro);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  };

  
  listarLivros = (res: Response): void => {
    try {
      const livros = this.livroService.listarLivros();
      if (livros.length === 0) {
      res.status(200).json({ mensagem: "Nenhum livro cadastrado no sistema." });
    }
      res.status(200).json(livros);
    } catch (error: any) {
      res.status(500).json({ erro: error.message });
    }
  };

  
  buscarLivroPorId = (req: Request, res: Response): void => {
    try {
      const id = Number(req.params.id);
      const livro = this.livroService.buscarPorId(id);
      res.status(200).json(livro);
    } catch (error: any) {
      res.status(404).json({ erro: error.message });
    }
  };

  
  atualizarLivro = (req: Request, res: Response): void => {
    try {
      const id = Number(req.params.id);
      const { titulo, autor, editora, edicao, isbn } = req.body;

      this.livroService.atualizarLivro(id, titulo, autor, editora, edicao, isbn);
      res.status(200).json({
      mensagem: "Livro atualizado com sucesso!"
    });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  };

  
  removerLivro = (req: Request, res: Response): void => {
    try {
      const id = Number(req.params.id);
      this.livroService.removerLivro(id);
      res.status(200).json({
            mensagem:"Livro deletado com sucesso !!"
        });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  };
}

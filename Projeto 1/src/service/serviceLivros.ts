import { Livro } from "../model/LivroBiblioteca";
import { LivroRepository } from "../repository/repositoryLivros";
import { CategoriaLivro } from "../model/CategoriaLivro";

export class LivroService {
  private livroRepository = LivroRepository.getInstance();

  criarLivro(
    titulo: string,
    autor: string,
    editora: string,
    edicao: string,
    isbn: string,
    categoria: CategoriaLivro
  ): Livro {
    // Validação simples
    if (!titulo || !autor || !editora || !edicao || !isbn || !categoria) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    // Verificar se já existe livro com mesmo ISBN
    const livrosExistentes = this.livroRepository.todosLivros();
    const jaExiste = livrosExistentes.some(l => l.isbn === isbn);
    if (jaExiste) {
      throw new Error("Livro com esse ISBN já está cadastrado.");
    }

    const novoLivro = new Livro(titulo, autor, editora, edicao, isbn, categoria);
    this.livroRepository.novoLivro(novoLivro);
    return novoLivro;
  }

  listarLivros(): Livro[] {
    return this.livroRepository.todosLivros();
  }

  buscarPorId(id: number): Livro {
    return this.livroRepository.detalhesLivro(id);
  }

  atualizarLivro(
    id: number,
    titulo: string,
    autor: string,
    editora: string,
    edicao: string,
    isbn: string
  ): void {
    this.livroRepository.attLivro(id, titulo, autor, editora, edicao, isbn);
  }

  removerLivro(id: number): void {
    const emprestado = false

    if (emprestado) {
      throw new Error("Livro está emprestado e não pode ser removido.");
    }

    this.livroRepository.excluirLivro(id);
  }
}

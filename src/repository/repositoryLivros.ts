import { Livro } from "../model/LivroBiblioteca";

export class LivroRepository {
  private static instance: LivroRepository;
  private livroList: Livro[] = [];

  private constructor() {}

  static getInstance(): LivroRepository {
    if (!this.instance) {
      this.instance = new LivroRepository();
    }
    return this.instance;
  }

  novoLivro(novoLivro: Livro): void {
    this.livroList.push(novoLivro);
  }

  todosLivros(): Livro[] {
    return this.livroList;
  }

  detalhesLivro(id: number): Livro {
    const index = this.procurarIndex(id);
    return this.livroList[index];
  }

  attLivro(id: number, titulo: string, autor: string, editora: string, edicao: string, isbn: string): void {
  const index = this.livroList.findIndex(l => l.id === id);
  if (index !== -1) {
    this.livroList[index].titulo = titulo;
    this.livroList[index].autor = autor;
    this.livroList[index].editora = editora;
    this.livroList[index].edicao = edicao;
    this.livroList[index].isbn = isbn;
  } else {
    throw new Error("Livro não encontrado.");
  }
}


  excluirLivro(id: number): void {
    const index = this.procurarIndex(id);
    this.livroList.splice(index, 1);
  }

  private procurarIndex(id: number): number {
    const index = this.livroList.findIndex(l => l.id === id);
    if (index === -1) {
      throw new Error("ID informado não foi encontrado!!!");
    }
    return index;
  }
}

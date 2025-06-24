// repository/repositoryCatalogo.ts
import { CategoriaUsuario } from "../model/CatergoriaUsuario";
import { CategoriaLivro } from "../model/CategoriaLivro";
import { Cursos } from "../model/CursoUsuario";

export class CategoriaRepository {
  private static instance: CategoriaRepository;
  private categoriasUsuario: CategoriaUsuario[] = [
    new CategoriaUsuario("Aluno"),
    new CategoriaUsuario("Professor"),
  ];
  private categoriasLivro: CategoriaLivro[] = [
    new CategoriaLivro("Programação"),
    new CategoriaLivro("Redes"),
    new CategoriaLivro("Engenharia"),
  ];
  private cursos: Cursos[] = [
    new Cursos("ADS"),
    new Cursos("Engenharia"),
    new Cursos("Matemática"),
  ];

  static getInstance(): CategoriaRepository {
    if (!this.instance) this.instance = new CategoriaRepository();
    return this.instance;
  }

  getCategoriasUsuario(): CategoriaUsuario[] {
    return this.categoriasUsuario;
  }

  getCategoriasLivro(): CategoriaLivro[] {
    return this.categoriasLivro;
  }

  getCursos(): Cursos[] {
    return this.cursos;
  }
}

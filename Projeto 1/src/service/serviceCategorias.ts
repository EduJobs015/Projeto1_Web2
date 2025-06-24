import { CategoriaRepository } from "../repository/repositoryCategoria";

export class CategoriaService {
  private repository = CategoriaRepository.getInstance();

  listarCategoriasUsuario() {
    return this.repository.getCategoriasUsuario();
  }

  listarCategoriasLivro() {
    return this.repository.getCategoriasLivro();
  }

  listarCursos() {
    return this.repository.getCursos();
  }
}

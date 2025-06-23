import { Usuario } from "../model/UsuarioBiblioteca";
import { UsuarioRepository } from "../repository/repositoryUsuario";
import { CategoriaUsuario } from "../model/CatergoriaUsuario";
import { Cursos } from "../model/CursoUsuario";

export class UsuarioService {
  private repository = UsuarioRepository.getInstance();
  // gpt ajudou 
  criar(nome: string, cpf: string, categoria: CategoriaUsuario, curso: Cursos): Usuario {
    if (!cpf || cpf.length !== 11 || !/^\d+$/.test(cpf)) {
      throw new Error("CPF inválido. Deve conter 11 números.");
    }

    const usuario = new Usuario(nome, cpf, true, curso, categoria);
    this.repository.adicionar(usuario);
    return usuario;
  }

  listar(): Usuario[] {
    return this.repository.listar();
  }

  buscarPorCpf(cpf: string): Usuario {
    const usuario = this.repository.buscarPorCpf(cpf);
    if (!usuario) throw new Error("Usuário não encontrado.");
    return usuario;
  }

  atualizar(cpf: string, dados: Usuario): void {
    this.repository.atualizar(cpf, dados);
  }

  remover(cpf: string, possuiEmprestimos: boolean): void {
    if (possuiEmprestimos) {
      throw new Error("Usuário possui empréstimos ativos e não pode ser removido.");
    }
    this.repository.remover(cpf);
  }

  suspenderUsuario(usuario: Usuario, diasAtraso: number): void {
    const diasSuspensao = diasAtraso * 3;
    if (diasSuspensao > 60) {
      usuario.status = false; 
    }
  }

  verificarStatusParaEmprestimo(usuario: Usuario): void {
    if (!usuario.status) throw new Error("Usuário inativo ou suspenso.");
  }
}

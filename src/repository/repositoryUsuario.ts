import { Usuario } from "../model/UsuarioBiblioteca";

export class UsuarioRepository {
  private static instance: UsuarioRepository;
  private usuarios: Usuario[] = [];

  private constructor() {}

  static getInstance(): UsuarioRepository {
    if (!this.instance) {
      this.instance = new UsuarioRepository();
    }
    return this.instance;
  }

  adicionar(usuario: Usuario): void {
    if (this.usuarios.find(u => u.cpf === usuario.cpf)) {
      throw new Error("CPF já cadastrado.");
    }
    this.usuarios.push(usuario);
  }

  listar(): Usuario[] {
    return this.usuarios;
  }

  buscarPorCpf(cpf: string): Usuario | undefined {
    return this.usuarios.find(u => u.cpf === cpf);
  }

  atualizar(cpf: string, dados: Partial<Usuario>): void {
    const usuario = this.buscarPorCpf(cpf);
    if (!usuario) throw new Error("Usuário não encontrado.");

    if (dados.nome) usuario.nome = dados.nome;
    if (dados.status !== undefined) usuario.status = dados.status;
    if (dados.categoriaId) usuario.categoriaId = dados.categoriaId;
    if (dados.cursoId) usuario.cursoId = dados.cursoId;
  }

  remover(cpf: string): void {
    const index = this.usuarios.findIndex(u => u.cpf === cpf);
    if (index === -1) throw new Error("Usuário não encontrado.");
    this.usuarios.splice(index, 1);
  }
}
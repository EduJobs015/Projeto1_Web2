import { Usuario } from "../model/UsuarioBiblioteca";
import { UsuarioRepository } from "../repository/repositoryUsuario";
import { CategoriaUsuario } from "../model/CatergoriaUsuario";
import { Cursos } from "../model/CursoUsuario";

export class UsuarioService {
  private repository = UsuarioRepository.getInstance();

  criar(nome: string, cpf: string, categoria: CategoriaUsuario, curso: Cursos): Usuario {
  
  if (!this.validarCPF(cpf)) {
    throw new Error("CPF inválido.");
  }

  const jaExiste = this.repository.buscarPorCpf(cpf);
  if (jaExiste) {
    throw new Error("Já existe um usuário com este CPF.");
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
  // gpt ajudou !!!
  validarCPF(cpf: string): boolean {
  // Remove pontos e traços, se houver
  cpf = cpf.replace(/\D/g, '');

  // 1. Verifica se possui exatamente 11 dígitos
  if (cpf.length !== 11) return false;

  // 2. Verifica se todos os dígitos são iguais (ex: 00000000000)
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // 3. Cálculo do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += Number(cpf[i]) * (10 - i);
  }

  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;

  if (digito1 !== Number(cpf[9])) return false;

  // 4. Cálculo do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += Number(cpf[i]) * (11 - i);
  }
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;

  if (digito2 !== Number(cpf[10])) return false;

  // CPF é válido
  return true;
}
}

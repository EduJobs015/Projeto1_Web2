import { Emprestimo } from "../model/EmprestimoBibliopteca";

export class EmprestimoRepository {
  private static instance: EmprestimoRepository;
  private emprestimos: Emprestimo[] = [];

  private constructor() {}

  static getInstance(): EmprestimoRepository {
    if (!this.instance) {
      this.instance = new EmprestimoRepository();
    }
    return this.instance;
  }

  salvar(emprestimo: Emprestimo): void {
    this.emprestimos.push(emprestimo);
  }

  listar(): Emprestimo[] {
    return this.emprestimos;
  }

  listarPorUsuario(cpf: string): Emprestimo[] {
    return this.emprestimos.filter(e => e.usuario_id.cpf === cpf);
  }

  buscarPorId(id: number): Emprestimo | undefined {
    return this.emprestimos.find(e => e.id === id);
  }
  atualizar(emprestimoAtualizado: Emprestimo): void {
    const index = this.emprestimos.findIndex(e => e.id === emprestimoAtualizado.id);
    if (index === -1) throw new Error("Empréstimo não encontrado.");
    this.emprestimos[index] = emprestimoAtualizado;
  }
}

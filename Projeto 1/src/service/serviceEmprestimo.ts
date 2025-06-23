import { EmprestimoRepository } from "../repository/repositoryEmprestimo";
import { Usuario } from "../model/UsuarioBiblioteca";
import { Estoque } from "../model/EstoqueBiblioteca";
import { Emprestimo } from "../model/EmprestimoBibliopteca";

export class EmprestimoService {
  private repository = EmprestimoRepository.getInstance();

  realizarEmprestimo(usuario: Usuario, estoque: Estoque): Emprestimo {
    if (!usuario.status) throw new Error("Usuário inativo.");

    // Buscar todos empréstimos do usuário (ativo e inativos)
    const emprestimosDoUsuario = this.repository.listarPorUsuario(usuario.cpf);

    // Filtrar os empréstimos ativos (não entregues)
    const emprestimosAtivos = emprestimosDoUsuario.filter(e => !e.data_entrega);

    // Verificar se usuário está suspenso
    if (usuarioSuspenso(usuario, emprestimosAtivos)) throw new Error("Usuário suspenso.");

    // Verificar limite de empréstimos conforme categoria gpt ajudou !!!
    const limite = usuario.categoriaId.nome.toLowerCase() === "professor" ? 5 : 3;
    if (emprestimosAtivos.length >= limite) {
      throw new Error("Usuário atingiu o limite de empréstimos.");
    }

    // Verificar disponibilidade do livro no estoque
    if (!estoque.disponibilidade) throw new Error("Livro indisponível.");

    // Definir dias do empréstimo Gpt me ajudou !!
    const diasEmprestimo = usuario.categoriaId.nome.toLowerCase() === "professor" ? 40 : usuario.cursoId.nome.toLowerCase() === estoque.livro_id.categoriaLivro_id.nome.toLowerCase() ? 30 : 15;

    // Atualizar estoque
    estoque.quantidade_emprestada++;
    estoque.disponibilidade = estoque.quantidade_emprestada < estoque.quantidade;

    // Criar novo empréstimo Gpt ajudou !!!
    const hoje = new Date();
    const dataDevolucao = new Date(hoje);
    dataDevolucao.setDate(hoje.getDate() + diasEmprestimo);

    const novoEmprestimo = new Emprestimo(hoje,dataDevolucao, null,0,null,usuario,estoque);

    this.repository.salvar(novoEmprestimo);
    return novoEmprestimo;
  }

  listarTodos(): Emprestimo[] {
    return this.repository.listar();
  }

  buscarPorId(id: number): Emprestimo {
    const emp = this.repository.buscarPorId(id);
    if (!emp) throw new Error("Empréstimo não encontrado.");
    return emp;
  }
  // gpt fez uma boa parte dessa parte infelizmente 
  registrarDevolucao(id: number): void {
    const emprestimo = this.repository.buscarPorId(id);
    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado.");
    }

    if (emprestimo.data_entrega) {
      throw new Error("Este empréstimo já foi devolvido.");
    }

    const hoje = new Date();
    emprestimo.data_entrega = hoje;

    if (emprestimo.data_devolucao && hoje > emprestimo.data_devolucao) {
      const atrasoDias = Math.ceil((hoje.getTime() - emprestimo.data_devolucao.getTime()) / (1000 * 60 * 60 * 24));
      emprestimo.dias_atraso = atrasoDias;
      const diasSuspensao = atrasoDias * 3;

      const dataSuspensao = new Date(hoje);
      dataSuspensao.setDate(hoje.getDate() + diasSuspensao);
      emprestimo.suspensao_emprestimo = dataSuspensao;
    } else {
      emprestimo.dias_atraso = 0;
      emprestimo.suspensao_emprestimo = null;
    }

    // Libera o exemplar 
    emprestimo.estoque_id.quantidade_emprestada--;
    emprestimo.estoque_id.disponibilidade = emprestimo.estoque_id.quantidade_emprestada < emprestimo.estoque_id.quantidade;

    this.repository.atualizar(emprestimo);
  }
}

// Função para verificar suspensão do usuário GPT Ajudou muito chato fazer isso !!!
function usuarioSuspenso(usuario: Usuario, emprestimos: Emprestimo[]): boolean {
  if (!usuario.status) return true;

  const hoje = new Date();
  let totalDiasSuspensao = 0;
  let livrosPendentes = 0;

  for (const emp of emprestimos) {
    if (emp.usuario_id.id !== usuario.id) continue;

    if (!emp.data_entrega) livrosPendentes++;

    if (emp.dias_atraso && emp.dias_atraso > 0) {
      totalDiasSuspensao += emp.dias_atraso * 3;
    }

    if (emp.suspensao_emprestimo && emp.suspensao_emprestimo > hoje) {
      return true;
    }
  }

  if (totalDiasSuspensao > 60) return true;
  if (livrosPendentes > 2) return true;

  return false;

}


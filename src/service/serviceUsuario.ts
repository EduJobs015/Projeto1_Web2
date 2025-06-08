import { Usuario } from "../model/UsuarioBiblioteca";
import { UsuarioRepository } from "../repository/repositoryUsuario";

export class UsuarioService {
    private usuarioRepository = UsuarioRepository.getInstanceUsuario();

    novoUsuario(data: any): Usuario {
        const { nome, cpf, status, cursoId, categoriaId } = data;

        if (!nome || !cpf || status === undefined || cursoId === undefined || categoriaId === undefined) {
            throw new Error("Erro: campos obrigatórios faltando!");
        }

        // Validação do CPF
        if (!this.validarCPF(cpf)) {
            throw new Error("CPF inválido!");
        }

        // Verifica se o CPF já existe
        const cpfExistente = this.usuarioRepository.procurarCpf(cpf);
        if (cpfExistente) {
            throw new Error("O CPF já existe!");
        }

        const usuario = new Usuario(nome, cpf, status, cursoId, categoriaId);
        this.usuarioRepository.novoUsuario(usuario);

        return usuario;
    }

    listaUsuario(): Usuario[] {
        return this.usuarioRepository.todosUsuarios();
    }

    atualizarUsuario(data: any): void {
        const { cpf, nome, status, cursoId, categoriaId } = data;

        if (!cpf || !nome || status === undefined || cursoId === undefined || categoriaId === undefined) {
            throw new Error("Erro: campos obrigatórios faltando para atualização!");
        }

        if (!this.validarCPF(cpf)) {
            throw new Error("CPF inválido!");
        }

        this.usuarioRepository.atualizarUsuario(cpf, nome, status, cursoId, categoriaId);
    }

    deletarUsuario(data: any): void {
        const { cpf, status } = data;

        if (!cpf || status === undefined) {
            throw new Error("Informações incompletas para deletar usuário.");
        }

        this.usuarioRepository.excluirUsuario(status, cpf);
    }

    validarCPF(cpf: string): boolean {

        if (cpf.length !== 11) return false;

        // Verifica se todos os dígitos são iguais
        let todosIguais = true;
        for (let i = 1; i < cpf.length; i++) {
            if (cpf[i] !== cpf[0]) {
                todosIguais = false;
                break;
            }
        }
        if (todosIguais) return false;

        // Cálculo do primeiro dígito verificador
        const calcularDigito = (cpfParcial: string, pesoInicial: number): number => {
            let soma = 0;
            for (let i = 0; i < cpfParcial.length; i++) {
                soma += parseInt(cpfParcial[i]) * (pesoInicial - i);
            }
            const resto = soma % 11;
            return resto < 2 ? 0 : 11 - resto;
        };

        const primeiroDigito = calcularDigito(cpf.substring(0, 9), 10);
        if (primeiroDigito !== parseInt(cpf[9])) return false;

        const segundoDigito = calcularDigito(cpf.substring(0, 10), 11);
        if (segundoDigito !== parseInt(cpf[10])) return false;

        return true;
    }
}

import { Usuario, Cursos, CategoriaUsuario } from "../model/UsuarioBiblioteca";

export class UsuarioRepository {
    private static instance: UsuarioRepository;
    private usuarioList: Usuario[] = [];
    private cursoList: Cursos[] = [];
    private categoriaList: CategoriaUsuario[] = [];

    private constructor() {}

    static getInstanceUsuario(): UsuarioRepository {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }

    // Usuário
    novoUsuario(novoUsuario: Usuario): void {
        this.usuarioList.push(novoUsuario);
    }

    todosUsuarios(): Usuario[] {
        return this.usuarioList;
    }

    procurarCpf(cpf: string): Usuario | null {
        return this.usuarioList.find(u => u.cpf === cpf) || null;
    }

    atualizarUsuario(cpf: string, nome: string, status: boolean, cursoId: number, categoriaId: number): void {
        const usuario = this.usuarioList.find(u => u.cpf === cpf);
        if (!usuario) {
            throw new Error("CPF não encontrado!");
        }

        usuario.nome = nome;
        usuario.status = status;
        usuario.cursoId = cursoId;
        usuario.categoriaId = categoriaId;
    }

    excluirUsuario(status: boolean, cpf: string): void {
        if (status !== false) {
            throw new Error("O usuário tem empréstimos pendentes!");
        }

        const index = this.usuarioList.findIndex(u => u.cpf === cpf);
        if (index === -1) {
            throw new Error("CPF não encontrado!");
        }

        this.usuarioList.splice(index, 1);
    }

    // Cursos
    adicionarCurso(nome: string): Cursos {
        const novoCurso = new Cursos(nome);
        this.cursoList.push(novoCurso);
        return novoCurso;
    }

    listarCursos(): Cursos[] {
        return this.cursoList;
    }

    // Categorias
    adicionarCategoria(nome: string): CategoriaUsuario {
        const novaCategoria = new CategoriaUsuario(nome);
        this.categoriaList.push(novaCategoria);
        return novaCategoria;
    }

    listarCategorias(): CategoriaUsuario[] {
        return this.categoriaList;
    }

    getCursoPorId(id: number): Cursos | undefined {
        return this.cursoList.find(c => c.id === id);
    }

    getCategoriaPorId(id: number): CategoriaUsuario | undefined {
        return this.categoriaList.find(cat => cat.id === id);
    }
}

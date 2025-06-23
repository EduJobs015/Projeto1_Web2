import { CategoriaUsuario } from "./CatergoriaUsuario";
import { Cursos } from "./CursoUsuario";
export class Usuario {
    readonly id: number;
    nome: string;
    cpf: string;
    status: boolean;
    categoriaId: CategoriaUsuario; // FK
    cursoId: Cursos;     // FK

    constructor(nome: string, cpf: string, status: boolean, cursoId: Cursos, categoriaId: CategoriaUsuario) {
        this.id = this.gerarId();
        this.nome = nome;
        this.cpf = cpf;
        this.status = status;
        this.cursoId = cursoId;
        this.categoriaId = categoriaId;
    }

    private gerarId(): number {
        return Date.now()
    }
}



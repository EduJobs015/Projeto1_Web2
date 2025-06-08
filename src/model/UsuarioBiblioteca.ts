export class Usuario {
    readonly id: number;
    nome: string;
    cpf: string;
    status: boolean;
    categoriaId: number; // FK
    cursoId: number;     // FK

    constructor(nome: string, cpf: string, status: boolean, cursoId: number, categoriaId: number) {
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

export class Cursos {
    readonly id: number;
    nome: string;

    constructor(nome: string) {
        this.id = this.gerarId();
        this.nome = nome;
    }

    private gerarId(): number {
        return Date.now() 
    }
}

export class CategoriaUsuario {
    readonly id: number;
    nome: string;

    constructor(nome: string) {
        this.id = this.gerarId();
        this.nome = nome;
    }

    private gerarId(): number {
        return Date.now()
    }
}

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
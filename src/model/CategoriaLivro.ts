export class CategoriaLivro {
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
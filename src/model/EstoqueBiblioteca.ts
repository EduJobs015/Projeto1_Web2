
import { Livro } from "./LivroBiblioteca"
export class Estoque{
    id: number 
    quantidade: number
    quantidade_emprestada: number
    disponibilidade: boolean
    livro_id: Livro // FK ID DO LIVRO

    constructor(quantidade: number, quantidade_emprestada: number,livro_id: Livro){
        this.id = this.gerarId()
        this.quantidade = quantidade
        this.quantidade_emprestada = quantidade_emprestada
        this.disponibilidade = this.disponibilidade = this.quantidade > this.quantidade_emprestada;
        this.livro_id = livro_id

    }


    private gerarId(): number{
        return Date.now();
    }
}
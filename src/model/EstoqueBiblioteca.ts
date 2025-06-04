
import { Livro } from "./LivroBiblioteca"
export class Estoque{
    id: number 
    quantidade: number
    quantidade_emprestada: number
    disponibilidade: boolean
    livro_id: number // FK ID DO LIVRO

    constructor(id: number,quantidade: number, quantidade_emprestada: number, disponibilidade: boolean,livro_id: number){
        this.id = this.gerarId()
        this.quantidade = quantidade
        this.quantidade_emprestada = quantidade_emprestada
        this.disponibilidade = disponibilidade
        this.livro_id = livro_id

    }


    private gerarId(): number{
        return Date.now();
    }
}
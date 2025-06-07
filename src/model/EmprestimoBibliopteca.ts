import { Usuario } from "./UsuarioBiblioteca"
import { Estoque } from "./EstoqueBiblioteca"
export class Emprestimo{
    id: number 
    data_emprestimo: Date
    data_devolucao: Date
    data_entrega: Date 
    dias_atraso: number
    suspensao_emprestimo: Date
    usuario_id: Usuario // FK ID DO USUARIO 
    estoque_id: Estoque // FK ID DO ESTOQUE



    constructor(data_emprestimo: Date,data_devolucao: Date,data_entrega: Date,dias_atraso: number, suspensao_emprestimo: Date){
        this.id = this.gerarId()
        this.data_emprestimo = data_emprestimo
        this.data_devolucao = data_devolucao
        this.data_entrega = data_entrega
        this.dias_atraso = dias_atraso
        this.suspensao_emprestimo = suspensao_emprestimo

    }

    private gerarId(): number{
        return Date.now();
    }
}
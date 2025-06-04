import { Usuario } from "./UsuarioBiblioteca"
import { Estoque } from "./EstoqueBiblioteca"
export class Emprestimo{
    id: number 
    data_emprestimo: Date
    data_devolucao: Date
    data_entrega: Date 
    dias_atraso: number
    suspensao_emprestimo: Date
    usuario_id: number // FK ID DO USUARIO 
    estoque_id: number // FK ID DO ESTOQUE



    constructor(id: number,data_emprestimo: Date,data_devolucao: Date,data_entrega: Date,suspensao_emprestimo: Date, usuario_id: number, estoque_id: number){
        this.id = this.gerarId()
        this.data_emprestimo = data_emprestimo
        this.data_entrega = data_entrega
        this.suspensao_emprestimo = suspensao_emprestimo
        this.estoque_id = estoque_id
        this.usuario_id = usuario_id


    }

    private gerarId(): number{
        return Date.now();
    }
}
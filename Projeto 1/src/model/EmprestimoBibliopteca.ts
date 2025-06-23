import { Usuario } from "./UsuarioBiblioteca"
import { Estoque } from "./EstoqueBiblioteca"
export class Emprestimo{
    id: number 
    data_emprestimo: Date
    data_devolucao: Date | null
    data_entrega: Date | null
    dias_atraso: number
    suspensao_emprestimo: Date | null
    usuario_id: Usuario // FK ID DO USUARIO 
    estoque_id: Estoque // FK ID DO ESTOQUE



    constructor(data_emprestimo: Date,data_devolucao: Date|null,data_entrega: Date|null,dias_atraso: number, suspensao_emprestimo: Date|null,usuario_id: Usuario,estoque_id: Estoque){
        this.id = this.gerarId()
        this.data_emprestimo = data_emprestimo
        this.data_devolucao = data_devolucao
        this.data_entrega = data_entrega
        this.dias_atraso = dias_atraso
        this.suspensao_emprestimo = suspensao_emprestimo
        this.usuario_id = usuario_id
        this.estoque_id = estoque_id

    }

    private gerarId(): number{
        return Date.now();
    }
}
export class Usuario{
    id: number 
    data_emprestimo: Date
    data_devolucao: Date
    data_entrega: Date 
    dias_atraso: number
    suspensao_emprestimo: Date 



    constructor(id: number,data_emprestimo: Date,data_devolucao: Date,data_entrega: Date,suspensao_emprestimo: Date){
        this.id = this.gerarId()
        this.data_emprestimo = data_emprestimo
        this.data_entrega = data_entrega
        this.suspensao_emprestimo = suspensao_emprestimo
    }



    private gerarId(): number{
        return Date.now();
    }
}
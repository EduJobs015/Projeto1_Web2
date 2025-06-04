export class Estoque{
    id: number 
    quantidade: number
    quantidade_emprestada: number
    disponibilidade: boolean

    constructor(id: number,quantidade: number, quantidade_emprestada: number, disponibilidade: boolean){
        this.id = this.gerarId()
        this.quantidade = quantidade
        this.quantidade_emprestada = quantidade_emprestada
        this.disponibilidade = disponibilidade

    }


    private gerarId(): number{
        return Date.now();
    }
}
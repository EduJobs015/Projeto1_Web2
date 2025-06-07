import { Estoque } from "../model/EstoqueBiblioteca" 

export class EstoqueRepository{
    private static instance: EstoqueRepository
    private estoqueList: Estoque[] = []

    constructor(){}

    static getInstanceEstoque(): EstoqueRepository{
        if( !this.instance ){
            this.instance = new EstoqueRepository()
        }
        return this.instance
    }

    novoEmprestimo(emprestimo: Estoque){
        this.estoqueList.push(emprestimo)
    }

    todosEmprestimos():Estoque[]{
        return this.estoqueList
    }

    detalhesEmprestimo(id:number ){
        const index = this.procurarIndex(id)
        return this.estoqueList[index]
    }

    attDisponibilidade(id:number,disponibilidade: boolean):void{
        const index = this.estoqueList.findIndex( est => est.id == id)
        if(index !== -1){
            this.estoqueList[index].disponibilidade = disponibilidade
        }else{
            throw new Error("Somente True e False")
        }
    }

    devolucaoEmprestimo(id: number){
        const index = this.procurarIndex(id)
        this.estoqueList.splice(index)

    }


    procurarIndex( id: number):number{
        const index = this.estoqueList.findIndex( emp => emp.id == id)
        if(index == -1){
            throw new Error("ID informado não foi encontrado!!!")
        }
        return index
    }

}
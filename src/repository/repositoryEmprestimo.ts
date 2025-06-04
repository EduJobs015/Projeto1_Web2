import { Emprestimo } from "../model/EmprestimoBibliopteca";

export class EmprestimoRepository{
    private static instance: EmprestimoRepository
    private emprestimoList: Emprestimo[] = []

    constructor(){}

    static getInstance(): EmprestimoRepository{
        if( !this.instance ){
            this.instance = new EmprestimoRepository()
        }
        return this.instance
    }

    addEmprestimo(exemplar: Emprestimo){
        this.emprestimoList.push(exemplar)
    }

    listEmprestimo():Emprestimo[]{
        return this.emprestimoList
    }

    deletEmprestimo(id: number){
        const index = this.procurarIndex(id)
        this.emprestimoList.splice(index)

    }


    procurarIndex( id: number):number{
        const index = this.emprestimoList.findIndex( est => est.id == id)
        if(index == -1){
            throw new Error("ID informado não foi encontrado!!!")
        }
        return index
    }

}
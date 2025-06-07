import { EmprestimoRepository } from "../repository/repositoryEmprestimo";
import { Emprestimo } from "../model/EmprestimoBibliopteca";

export class EmprestimoService{
    private emprestimoService = EmprestimoRepository.getInstanceEmprestimo()

    novoEmprestimo(data:any): Emprestimo{
        if(!data.data_emprestimo || !data.data_devolucao || !data.ata_entrega || !data.dias_atraso || !data.suspensao_emprestimo){
            throw new Error ("Erro em um dos campos !!")
        }

        const emprestimo = new Emprestimo(data.data_emprestimo, data.data_devolucao, data.ata_entrega, data.dias_atraso, data.suspensao_emprestimo)
        this.emprestimoService.addEmprestimo(emprestimo)

        return emprestimo
    }

    listaEmprestimo():Emprestimo[]{
        return this.emprestimoService.listEmprestimo()
    }

    deletEmprestimo(data:any){
        if(!Id,!data.data_emprestimo || !data.data_devolucao || !data.ata_entrega || !data.dias_atraso || !data.suspensao_emprestimo){
            throw new Error("Informações incompletas");
        }
        this.emprestimoService.deletEmprestimo
    }


}
import { Usuario } from "../model/UsuarioBiblioteca"
import { Cursos } from "../model/UsuarioBiblioteca"
import { CategoriaUsuario } from "../model/UsuarioBiblioteca"

export class UsuarioRepository{
    private static instance: UsuarioRepository
    private UsuarioList: Usuario[] = []

    constructor(){}

    static getInstance(): UsuarioRepository{
        if( !this.instance ){
            this.instance = new UsuarioRepository()
        }
        return this.instance
    }


    NovoUsuario(novoUsuario:Usuario){
        this.UsuarioList.push(novoUsuario)
    }

    todosUsuarios():Usuario[]{
        return this.UsuarioList
    }

    detalhesLivro(cpf:number ){
        const index = this.procurarcpf(cpf)
        return this.UsuarioList[index]
    }

    attLivro(cpf: number, name: string, status:boolean, ):void{
        const index = this.UsuarioList.findIndex( est => est.cpf == cpf)
        if(index !== -1){
            this.UsuarioList[index].name = name
            this.UsuarioList[index].status = status
            this.UsuarioList[index]. = editora
        }else{
            throw new Error("Cpf não encontrado !!!")
        }
    }

    excluirlivro(cpf: number){
        const index = this.procurarcpf(cpf)
        this.UsuarioList.splice(index)

    }


    procurarcpf( cpf: number):number{
        const index = this.UsuarioList.findIndex( emp => emp.cpf == cpf)
        if(index == -1){
            throw new Error("ID informado não foi encontrado!!!")
        }
        return index
    }

}
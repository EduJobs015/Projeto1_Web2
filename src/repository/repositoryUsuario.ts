import { Usuario } from "../model/UsuarioBiblioteca"
import { Cursos } from "../model/UsuarioBiblioteca"
import { CategoriaUsuario } from "../model/UsuarioBiblioteca"

export class UsuarioRepository{
    private static instance: UsuarioRepository
    private UsuarioList: Usuario[] = []
    private cursoList: Cursos[] = []
    private categoriaList: CategoriaUsuario[] = []

    constructor(){}

    static getInstanceUsuario(): UsuarioRepository{
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



    attUsuario(cpf: number, nome: string, status:boolean,nameCategoria: string ,nameCurso: string ):void{
        const index = this.UsuarioList.findIndex( est => est.cpf == cpf)
        if(index !== -1){
            this.UsuarioList[index].nome = nome
            this.UsuarioList[index].status = status
            this.categoriaList[index].name = nameCategoria
            this.cursoList[index].name = nameCurso
        }else{
            throw new Error("Cpf não encontrado !!!")
        }
    }

    excluirUsuario(status: boolean, cpf: number){
        const index = this.procurarcpf(cpf)
        if(status == false)
            this.UsuarioList.splice(index)
        else{
            throw new Error ("O Usuario tem emprestimos pendentes !!")
        }

    }


    procurarcpf( cpf: number):number{
        const index = this.UsuarioList.findIndex( emp => emp.cpf == cpf)
        if(index == -1){
            throw new Error("Cpf não encontrado !!!")
        }
        return index
    }

}
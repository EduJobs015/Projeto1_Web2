import { CategoriaLivro } from "./Categoria_Livro"
import { Cursos } from "./Cursos"
export class Usuario{
    id: number 
    name: string
    cpf: number 
    status: boolean
    categoria_id: number // FK ID DA CATEGORIA
    curso_id: number// FK ID DO CURSO



    constructor(id: number, name: string, cpf: number, status: boolean,categoria_id: number,curso_id: number){
        this.id = this.gerarId()
        this.name = name
        this.cpf = cpf
        this.status = status
        this.categoria_id = categoria_id
        this.curso_id = curso_id  
    }




    private gerarId(): number{
        return Date.now();
    }
}
export class Usuario{
    id: number 
    name: string
    cpf: number 
    status: boolean
    categoria_id: number // FK ID DA CATEGORIA
    curso_id: Cursos// FK ID DO CURSO



    constructor(id: number, name: string, cpf: number, status: boolean,categoria_id: CategoriaLivro,curso_id: Cursos){  
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

export class Cursos{
    id: number 
    name: string


    constructor(id: number, name: string){
        this.id = this.gerarIdCurso() 
        this.name = name
    }


    private gerarIdCurso(): number{
        return Date.now();
    }
}

export class CategoriaUsuario{
    id: number 
    name: string


    constructor(id: number, name: string){
        this.id = this.gerarId() 
        this.name = name
    }


    private gerarId(): number{
        return Date.now();
    }
}



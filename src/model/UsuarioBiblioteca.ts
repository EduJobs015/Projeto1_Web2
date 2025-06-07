export class Usuario{
    id: number 
    nome: string
    cpf: number 
    status: boolean
    categoria_id: CategoriaUsuario // FK ID DA CATEGORIA
    curso_id: Cursos// FK ID DO CURSO



    constructor(nome: string, cpf: number, status: boolean){  
        this.id = this.gerarId()
        this.nome = nome
        this.cpf = cpf
        this.status = status
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



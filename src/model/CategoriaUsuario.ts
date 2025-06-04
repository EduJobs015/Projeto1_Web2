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
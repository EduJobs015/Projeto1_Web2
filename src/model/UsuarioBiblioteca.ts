export class Usuario{
    id: number 
    name: string
    cpf: number 
    status: boolean



    constructor(id: number, name: string, cpf: number, status: boolean){
        this.id = this.gerarId()
        this.name = name
        this.cpf = cpf
        this.status = status
    }



    private gerarId(): number{
        return Date.now();
    }
}
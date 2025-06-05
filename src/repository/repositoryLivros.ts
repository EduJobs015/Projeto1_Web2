import { Livro } from "../model/LivroBiblioteca"

export class LivroRepository{
    private static instance: LivroRepository
    private LivroList: Livro[] = []

    constructor(){}

    static getInstance(): LivroRepository{
        if( !this.instance ){
            this.instance = new LivroRepository()
        }
        return this.instance
    }


    novoLivro(novoLivro: Livro){
        this.LivroList.push(novoLivro)
    }

    todosLivros():Livro[]{
        return this.LivroList
    }

    detalhesLivro(id:number ){
        const index = this.procurarIndex(id)
        return this.LivroList[index]
    }

    attLivro(id:number,titulo: string, autor: string, editora:string,edicao:string,isbn:string):void{
        const index = this.LivroList.findIndex( est => est.id == id)
        if(index !== -1){
            this.LivroList[index].titulo = titulo
            this.LivroList[index].titulo = autor
            this.LivroList[index].titulo = editora
            this.LivroList[index].titulo = edicao
            this.LivroList[index].titulo = isbn
        }else{
            throw new Error("Somente True e False")
        }
    }

    excluirlivro(id: number){
        const index = this.procurarIndex(id)
        this.LivroList.splice(index)

    }


    procurarIndex( id: number):number{
        const index = this.LivroList.findIndex( emp => emp.id == id)
        if(index == -1){
            throw new Error("ID informado não foi encontrado!!!")
        }
        return index
    }

}
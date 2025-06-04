import { CategoriaLivro } from "./Categoria_Livro"
export class Livro{
    id: number 
    titulo: string
    autor: string
    editora: string
    edicao: string
    isbn: string
    categoriaLivro_id: number // FK ID DA CATEGORIA 

    constructor(id: number,titulo: string,autor: string,editora: string,edicao: string,isbn: string,categoriaLivro_id: number){
        this.id = this.gerarId()
        this.titulo = titulo
        this.autor = autor
        this.editora = editora
        this.edicao = edicao
        this.isbn = isbn
        this.categoriaLivro_id = categoriaLivro_id

    }


    private gerarId(): number{
        return Date.now();
    }
}
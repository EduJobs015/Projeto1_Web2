import { Usuario } from "../model/UsuarioBiblioteca"
import{UsuarioRepository} from "../repository/repositoryUsuario"

export class UsuarioService{
    private usuarioService = UsuarioRepository.getInstanceUsuario()

    novoUsuario(data:any): Usuario{
        if(!data.nome || !data.cpf || !data.status){
            throw new Error ("Erro em um dos campos !!")
        }
        const validarCpf = this.usuarioService.procurarcpf(data.cpf)
        if(data.cpf == validarCpf){
            throw new Error ("O cpf ja existe")
        }

        const usuario = new Usuario(data.nome, data.cpf, data.status)
        this.usuarioService.NovoUsuario(usuario)

        return usuario
    }

    listaUsuario():Usuario[]{
        return this.usuarioService.todosUsuarios()
    }

    deletEmprestimo(data:any){
        if(,!data.data_emprestimo || !data.data_devolucao || !data.ata_entrega || !data.dias_atraso || !data.suspensao_emprestimo){
            throw new Error("Informações incompletas");
        }
        this.emprestimoService.deletEmprestimo
    }


}
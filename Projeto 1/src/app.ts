import express from "express";
import { LivroController } from "./controller/controllerLivro";
import { EstoqueController } from "./controller/controllerEstoque";
import { UsuarioController } from "./controller/ControllerUsuario";
import { EmprestimoController } from "./controller/controllerEmprestimo";
import { CategoriaController } from "./controller/controllerCategoria";

const app = express();
const port = process.env.PORT ?? 3090;

app.use(express.json());

const estoqueController = new EstoqueController();
const livroController = new LivroController();
const usuarioController = new UsuarioController();
const emprestimoController = new EmprestimoController();
const categoriaController = new CategoriaController();


// Rotas para categoria
app.get("/api/categorias-usuario", categoriaController.getCategoriasUsuario);
app.get("/api/categorias-livro", categoriaController.getCategoriasLivro);
app.get("/api/cursos", categoriaController.getCursos);

// Rotas para Emprestimo 
app.post("/api/emprestimos", emprestimoController.realizarEmprestimo);
app.get("/api/emprestimos", emprestimoController.listarTodos);
app.put("/api/emprestimos/:id/devolucao", emprestimoController.registrarDevolucao);

// Rotas para Usuario de Livros
app.post("/api/usuarios", usuarioController.criarUsuario);
app.get("/api/usuarios", usuarioController.listarUsuarios);
app.get("/api/usuarios/:cpf", usuarioController.buscarUsuario);
app.put("/api/usuarios/:cpf", usuarioController.atualizarUsuario);
app.delete("/api/usuarios/:cpf", usuarioController.deletarUsuario);


// Rotas para Emprestimo de Livro 
app.post("/api/estoque", estoqueController.criarEstoque);
app.get("/api/estoque", estoqueController.listarDisponiveis);
app.get("/api/estoque/:codigo", estoqueController.buscarPorId);
app.put("/api/estoque/:codigo", estoqueController.atualizarEstoque);
app.delete("/api/estoque/:codigo", estoqueController.removerEstoque);

// Rotas de Livros
app.post("/api/livros", livroController.criarLivro);
app.get("/api/livros/:id", livroController.buscarLivroPorId);
app.get("/api/livros", livroController.listarLivros);
app.put("/api/livros/:id", livroController.atualizarLivro);
app.delete("/api/livros/:id", livroController.removerLivro);

app.listen(port, () => {
console.log(`Servidor rodando na porta ${port}`);
});


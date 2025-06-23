import express from "express";
//import { UsuarioController, CursoController, CategoriaController } from "./controller/ControllerUsuario"; 
import { LivroController } from "./controller/controllerLivro";
import { EstoqueController } from "./controller/controllerEstoque";

const app = express();
const port = process.env.PORT ?? 3090;

app.use(express.json());

// Controllers
//const usuarioController = new UsuarioController();
//const cursoController = new CursoController();
//const categoriaController = new CategoriaController();
const estoqueController = new EstoqueController();
const livroController = new LivroController();

// Rotas de Usuários
//app.post("/api/usuarios", usuarioController.criarUsuario);
//app.get("/api/usuarios", usuarioController.listarUsuarios);
//app.get("/api/usuarios/:cpf", usuarioController.buscarUsuarioPorCpf);
//app.put("/api/usuarios/:cpf", usuarioController.atualizarUsuario);
//app.delete("/api/usuarios/:cpf", usuarioController.deletarUsuario);

// Rotas de Cursos
//app.get("/api/cursos", cursoController.listarCursos);
//app.post("/api/cursos", cursoController.criarCurso);

// Rotas de Categorias
//app.get("/api/categorias", categoriaController.listarCategorias);
//app.post("/api/categorias", categoriaController.criarCategoria);

// Rotas para Emprestimo de Livro 
app.post("/api/estoque", estoqueController.criarEstoque);
app.get("/api/estoque", estoqueController.listarDisponiveis);
app.get("/api/estoque/:codigo", estoqueController.buscarPorId);
app.put("/api/estoque/:codigo", estoqueController.atualizarEstoque);
app.delete("/api/estoque/:codigo", estoqueController.removerEstoque);

// Rotas de Livros
app.post("/api/livros", livroController.criarLivro);
app.get("/api/livros", livroController.listarLivros);
app.get("/api/livros/:id", livroController.buscarLivroPorId);
app.put("/api/livros/:id", livroController.atualizarLivro);
app.delete("/api/livros/:id", livroController.removerLivro);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


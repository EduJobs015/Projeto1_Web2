import express from "express";
import { UsuarioController, CursoController, CategoriaController} from "./controller/ControllerUsuario";

const app = express();
const port = process.env.PORT ?? 3090;

app.use(express.json());

const usuarioController = new UsuarioController();
const cursoController = new CursoController();
const categoriaController = new CategoriaController();

// Usuários
app.post("/api/usuarios", usuarioController.criarUsuario);
app.get("/api/usuarios", usuarioController.listarUsuarios);
app.put("/api/usuarios/:cpf", usuarioController.atualizarUsuario);
app.delete("/api/usuarios/:cpf", usuarioController.deletarUsuario);

// Cursos
app.get("/api/cursos", cursoController.listarCursos);
app.post("/api/cursos", cursoController.criarCurso);

// Categorias
app.get("/api/categorias", categoriaController.listarCategorias);
app.post("/api/categorias", categoriaController.criarCategoria);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

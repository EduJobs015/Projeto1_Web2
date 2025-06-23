import express from "express";
import { LivroController } from "./controller/controllerLivro";
import { EstoqueController } from "./controller/controllerEstoque";

const app = express();
const port = process.env.PORT ?? 3090;

app.use(express.json());

const estoqueController = new EstoqueController();
const livroController = new LivroController();


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


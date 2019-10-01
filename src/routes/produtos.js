module.exports = function(app) {
    
    const produtosController = app.controllers.produtos   

    app.get("/produtos", produtosController.listar)
    app.get("/produtos/:id", produtosController.consultarPorId)
    app.post("/produtos", produtosController.adicionar)
    app.put("/produtos/:id", produtosController.atualizar)
    app.delete("/produtos/:id", produtosController.excluir)
}
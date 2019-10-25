module.exports = (app) => {
    let ProdutosSchema = app.get("mongoose").Schema({
        nome: String,
        valor: Number,
        imagem: String
    })

    app.get("mongoose").model("Produtos", ProdutosSchema)
}
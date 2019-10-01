module.exports = function(app) {

    return {
        listar: function(req, res) {
            res.json(app.db.produtos)
        },
        consultarPorId: function(req, res) {
            let id = req.params.id
            let produto = app.db.produtos.filter((item) => item.id == id)
            res.json(produto)
        },
        adicionar: (req, res) => {
            let produto = req.body
            app.db.produtos.push(produto)
            res.end("Adicionar produto")
        },
        atualizar: (req, res) => {
            let id = req.params.id
            let produto = req.body
            let index = app.db.produtos.findIndex((item) => item.id == id)
            app.db.produtos[index] = produto
            res.end("Produto atualizado com sucesso!")
        },
        excluir: (req, res) => {
            let id = req.params.id
            app.db.produtos = app.db.produtos.filter((item) => item.id != id)
            res.end("Produto excluido com sucesso!")
        }
    }
}
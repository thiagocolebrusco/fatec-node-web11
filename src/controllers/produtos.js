module.exports = function(app) {
    let produtosModel = app.get("mongoose").model("Produtos")

    return {
        listar: function(req, res) {
            console.log(req.decoded)
            produtosModel.find({})
                .then((produtos) => {
                    res.json(produtos)
                })
        },
        consultarPorId: function(req, res) {
            let id = req.params.id
            produtosModel.findById(id)
                .then((produto, err) => {
                    if(err)
                        res.end("Não foi possível consultar o produto")
                    else
                        res.json(produto)
                })
        },
        adicionar: (req, res) => {
            let produto = new produtosModel(req.body)
            produto.save((err) => {
                if(err)
                    res.end("Erro ao inserir produto")
                else
                    res.end("Produto adicionado com sucesso")
            })
        },
        atualizar: (req, res) => {
            let id = req.params.id
            let produto = req.body
            produtosModel.findByIdAndUpdate(id, produto, (err) => {
                res.end(err ? err : "Produto atualizado com sucesso")
            })
        },
        excluir: (req, res) => {
            let id = req.params.id
            produtosModel.findByIdAndRemove(id, (err) => {
                res.end(err ? err : "Produto excluído com sucesso")
            })
        }
    }
}
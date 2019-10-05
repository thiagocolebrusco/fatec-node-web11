module.exports = function(app) {

    return {
        listar: function(req, res) {
            res.json(app.db.usuarios)
        },
        consultarPorId: function(req, res) {
            let id = req.params.id
            let usuario = app.db.usuarios.filter((item) => item.id == id)
            res.json(usuario)
        },
        adicionar: (req, res) => {
            let usuario = req.body
            app.db.usuarios.push(usuario)
            res.end("Adicionar usuário")
        },
        atualizar: (req, res) => {
            let id = req.params.id
            let usuario = req.body
            let index = app.db.usuarios.findIndex((item) => item.id == id)
            app.db.usuarios[index] = usuario
            res.end("Usuário atualizado com sucesso!")
        },
        excluir: (req, res) => {
            let id = req.params.id
            app.db.usuarios = app.db.usuarios.filter((item) => item.id != id)
            res.end("Usuário excluido com sucesso!")
        }
    }
}
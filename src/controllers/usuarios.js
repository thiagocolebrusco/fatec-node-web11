module.exports = function(app) {
    let usuariosModel = app.get("mongoose").model("Usuarios")

    return {
        listar: function(req, res) {
            usuariosModel.find({})
                .then((usuarios) => {
                    res.json(usuarios)
                })
        },
        consultarPorId: function(req, res) {
            let id = req.params.id
            usuariosModel.findById(id)
                .then((usuario, err) => {
                    if(err)
                        res.end("Não foi possível consultar o usuário")
                    else
                        res.json(usuario)
                })
        },
        adicionar: (req, res) => {
            let usuario = new usuariosModel(req.body)
            usuario.save((err) => {
                if(err)
                    res.end("Erro ao inserir usuário: " + err)
                else
                    res.end("Usuário adicionado com sucesso")
            })
        },
        atualizar: (req, res) => {
            let id = req.params.id
            let usuario = req.body
            usuariosModel.findByIdAndUpdate(id, usuario, (err) => {
                res.end(err ? err : "Usuário atualizado com sucesso")
            })
        },
        excluir: (req, res) => {
            let id = req.params.id
            usuariosModel.findByIdAndRemove(id, (err) => {
                res.end(err ? err : "Usuário excluído com sucesso")
            })
        },
        login: (req, res) => {
            let email = req.body.email,
                senha = req.body.senha


            
            usuariosModel.findOne({ email })
                .then((usuario) => {
                    if(! usuario) {
                        res.end("Usuário não encontrado")
                    } else if (usuario.senha != senha) {
                        res.end("Senha inválida")
                    } else {
                        let payload = { 
                            id: usuario._id, 
                            email 
                        }
                        let token = app.get("jwt").sign(payload, "senhasupersecreta", {
                            expiresIn: 60*60*24
                        })
                        res.json({
                            token,
                            usuario
                        })
                    }
                })
        }
    }
} 

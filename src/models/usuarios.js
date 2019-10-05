module.exports = (app) => {
    let UsuariosSchema = app.get("mongoose").Schema({
        nome: String,
        email: String,
        senha: String
    })

    app.get("mongoose").model("Usuarios", UsuariosSchema)
}
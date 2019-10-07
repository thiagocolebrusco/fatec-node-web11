module.exports = (app) => {
    let UsuariosSchema = app.get("mongoose").Schema({
        nome: { type: String, required: [true, 'é obrigatório'] },
        email: { type: String, 
                    required: [true, 'é obrigatório'], 
                    match: [/\S+@\S+\.\S+/, 'é inválido'] 
            },
        senha: { type: String, required: [true, 'é obrigatório'] }
    })

    app.get("mongoose").model("Usuarios", UsuariosSchema)
}
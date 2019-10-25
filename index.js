const port = 3000
const host = "localhost"
const express = require("express")
const consign = require("consign")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const app = express()
const Server = require("http").Server(app)
const io = require("socket.io")(Server)
require("dotenv").config()

app.set("mongoose", mongoose)
app.set("jwt", jwt)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/uploads", express.static("uploads"))

mongoose.connect(`mongodb://${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log("Conexão foi realizada com o Mongo"))
    .catch((err) => console.log("Erro ao conectar no Mongo: " + err))


consign({ cwd: 'src' })
    .include("models")
    .then("middlewares")
    .then("utils")
    .then("controllers")
    .then("routes")
    .into(app)

let usuarios_logados = 0;

io.on("connection", (client) => {
    usuarios_logados++;
    console.log("Um usuário se conectou")
    client.broadcast.emit("message", "Usuários logados: " + usuarios_logados)

    client.on("disconnect", () => {
        usuarios_logados--;
        client.broadcast.emit("message", "Usuários logados: " + usuarios_logados)
    })
})
    


Server.listen(port, host, function() {
    console.log(`Aplicação rodando no endereço ${host}:${port}`)
})

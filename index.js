const port = 3000
const host = "localhost"
const express = require("express")
const consign = require("consign")
const mongoose = require("mongoose")
const app = express()

app.set("mongoose", mongoose)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect("mongodb://localhost:27017/nodefatec", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log("Conexão foi realizada com o Mongo"))
    .catch((err) => console.log("Erro ao conectar no Mongo: " + err))

consign({ cwd: 'src' })
    .include("db")
    .then("models")
    .then("controllers")
    .then("routes")
    .into(app)


app.listen(port, host, function() {
    console.log(`Aplicação rodando no endereço ${host}:${port}`)
})

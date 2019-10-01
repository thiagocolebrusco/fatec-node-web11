const port = 3000
const host = "localhost"
const express = require("express")
const consign = require("consign")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

consign({ cwd: 'src' })
    .include("db")
    .then("controllers")
    .then("routes")
    .into(app)


app.listen(port, host, function() {
    console.log(`Aplicação rodando no endereço ${host}:${port}`)
})

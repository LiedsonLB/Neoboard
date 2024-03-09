const express = require('express')
const app = express()

app.use(express.json())

app.get("/login", async (req, res) => {
    
})

app.post("/cadaster", async (req, res) => {

})

app.listen(4000, () => {
    console.log("Api rodando na porta 4000")
})
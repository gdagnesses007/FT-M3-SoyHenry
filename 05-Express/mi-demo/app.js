const express = require('express')
const app = express()

app.use(express.json())

app.post('/', (req, res) => {
    const { body } = req
    res.send(body)
})

app.get('/', (req, res, next) => {
    res.send('Hello')
})

app.get('/home', (req, res) => {
    res.send('esta es la home')
})

app.get('/ab?cd', (req, res) => {
    const string = '? significa que el elemento que lo antecede es opcional en la ruta'
    res.send(string)
})

app.get('/ab*cd', (req, res) => {
    const string = '* significa que el elemento que lo antecede puede aparecer una o mas veces'
    res.send(string)
})

app.get('/welcome/:name/:lastname/curso', (req, res) => {
    const { name, lastname } = req.params
    res.send(`Hola ${name} ${lastname}, bienvenido al curso`)
})

app.listen(1337)
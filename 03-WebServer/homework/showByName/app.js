var fs = require("fs")
var http = require("http")

// Escribí acá tu servidor
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'image/jpeg' })
    const { url } = req
    const img = fs.readFileSync(`${__dirname}/images/${url}.jpg`)
    res.end(img)
}).listen(1337, '127.0.0.1')
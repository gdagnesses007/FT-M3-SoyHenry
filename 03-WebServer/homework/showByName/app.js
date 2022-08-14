var fs = require("fs")
var http = require("http")

// Escribí acá tu servidor
http.createServer((req, res) => {
    const { url } = req
    fs.readFile(`${__dirname}/images/${url}.jpg`, (error, data) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end(error.toString());
        } else {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' })
            res.end(data)
        }
    })

}).listen(1337, '127.0.0.1')
const express = require('express')
const app = express()

app.use("/assets/", express.static(__dirname + "/public"))

app.use("/", function (req, res, next) {
    console.log("Hicieron un Request a " + req.url);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello guille!')
})

app.get('/api', (req, res) => {
    var obj = {
        nombre: "prueba",
        framework: "express",
        ventaja: "serializó por nosotros",
    }
    res.json(obj)
})

app.get("/api/:id", function (req, res) {
    const { id } = req.params
    res.json({
        parametro: id
    })
})

app.get('/api/:id/:nombre/:valor', function (req, res) {
    const { id, nombre, valor } = req.params
    res.json({
        id,
        nombre,
        valor
    })
})

app.get("/static", function (req, res) {
    res.send(
        `<html>
            <head> 
                <link href="/assets/main.css" rel="stylesheet"> 
            </head>
            <body> 
                <p>Archivos estaticos rapido y facil!!</p>
                <img src="/assets/sexy_doge.jpg">
            </body>
        </html>`
    )
})

app.get("/datos/", function (req, res) {
    res.json(req.query);
});

app.get("/form", function (req, res) {
    res.send(
        `<html>
            <head> 
                <link href="/assets/style.css" rel="stylesheet">
            </head>
            <body>
                <form method="POST" action="/form">
                    Nombre <input name="nombre" type="text"><br>
                    Apellido <input name="apellido" type="text"><br>
                    Curso <input name="curso" type="text"><br>
                    <input type="submit">
                </form>
            </body>
        </html>`
    );
});

app.use(express.urlencoded({ extended: false }));
app.post("/form", function (req, res) {
    res.json(req.body);
});


app.use(express.json());
app.post("/formjson", function (req, res) {
  res.json(req.body);
});

app.listen(1337, () => console.log('Listening on port 1337'))
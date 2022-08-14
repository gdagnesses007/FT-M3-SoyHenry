var http = require('http');
var fs = require('fs');

var beatles = [{
    name: "John Lennon",
    birthdate: "09/10/1940",
    profilePic: "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
    name: "Paul McCartney",
    birthdate: "18/06/1942",
    profilePic: "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
    name: "George Harrison",
    birthdate: "25/02/1946",
    profilePic: "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
    name: "Richard Starkey",
    birthdate: "07/08/1940",
    profilePic: "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]
var fs = require("fs")
var http = require("http")

http.createServer((req, res) => {

    const { url } = req

    if (/^\/api\/?$/.test(url)) {           //url: /api | /api/
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(beatles))
    } else if (/^\/api\/.+/.test(url)) {    //url: /api/*
        const name = url.split('/').pop()
        const item = beatles.find(item => encodeURI(item.name) === name)
        if (item === undefined) {
            res.writeHead(404)
            res.end("The person you're looking for does not exists in database")
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(item))
        }
    } else {
        res.writeHead(404)
        res.end("Ups!!! Something has been broken!!!")
    }

}).listen(1337, 'localhost')
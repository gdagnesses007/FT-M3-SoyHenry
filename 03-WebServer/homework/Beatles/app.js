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

    if (url === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                errorResponse(res, err.toString())
            } else {
                htmlResponse(res, data)
            }
        })
    } else if (/^\/api\/?$/.test(url)) {           //url: /api | /api/
        jsonResponse(res, beatles)
    } else if (/^\/api\/.+/.test(url)) {    //url: /api/*
        const item = getArgUrl(url)
        if (item === undefined) {
            errorResponse(res, "The person you're looking for does not exists in database")
        } else {
            jsonResponse(res, item)
        }
    } else if (/^\/.*$/.test(url)) {
        const item = getArgUrl(url)
        fs.readFile('./beatle.html', 'utf8', (err, data) => {
            if (err) {
                errorResponse(res, err.toString())
            } else if (item === undefined) {
                errorResponse(res, "The person you're looking for does not exists in database")
            } else {
                for (const key in item) {
                    data = data.replace(`{%${key}%}`, () => item[key])
                }
                htmlResponse(res, data)
            }
        })
    } else {
        errorResponse(res, "Ups!!! Something has been broken!!!")
    }

}).listen(1337, 'localhost')

/**
 * Devuelve el objeto que coincide con el ultimo argumento en la url
 * 
 * @param {string} url 
 * @returns Objeto encontrado o undefined en caso contrario
 */
const getArgUrl = url => {
    const name = url.split('/').pop()
    return beatles.find(item => encodeURI(item.name) === name)
}

const errorResponse = (res, msg = '') => {
    res.writeHead(404)
    res.end(msg)
}

const jsonResponse = (res, json) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(json))
}

const htmlResponse = (res, html) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html)
}
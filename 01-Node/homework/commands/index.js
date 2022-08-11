const fs = require('fs')
const req = require('request')

module.exports = {
    /* extra credit */
    sort: ({ args, done }) => {

    },
    wc: ({ args, done }) => {

    },
    uniq: ({ args, done }) => {

    },

    /* normal  */
    curl: ({ args, done }) => {
        req(args, (error, response, body) => {
            if (error) done(error.toString())
            done(body)
        })
    },
    cat: ({ args, done }) => {
        fs.readFile(args, 'utf8', (error, data) => {
            if (error) throw error
            done(data)
        })
    },
    head: ({ args, done }) => {
        const [filename, count = 5] = args.split(' ')
        fs.readFile(filename, 'utf8', (error, data) => {
            if (error) throw error
            const firstLines = data.split('\n').slice(0, count).join('\n')
            done(firstLines)
        })
    },
    tail: ({ args, done }) => {
        const [filename, count = 5] = args.split(' ')
        fs.readFile(filename, 'utf8', (error, data) => {
            if (error) throw error
            const lastLines = data.split('\n').slice(-count + 1).join('\n')
            done(lastLines)
        })
    },
    echo: ({ args, done }) => {
        if (!args) {
            done('No se puede usar este comando sin argumentos')
        } else {
            done(args)
        }
    },
    ls: ({ done }) => {
        fs.readdir('.', (error, files) => {
            if (error) throw error
            let result = ''
            files.forEach(file => {
                result += `${file.toString()}\n`
            })
            done(result)
        })
    },
    psw: ({ done }) => {
        done(`Estas en este directorio: ${process.cwd()}`)
    },
    date: ({ done }) => {
        done(Date())
    },
    checkcmd: function ({ cmdSplit, done }) {
        if (!this.hasOwnProperty(cmdSplit)) {
            done(`${cmdSplit} no encontrado`)
            return false
        }
        return true
    }
}
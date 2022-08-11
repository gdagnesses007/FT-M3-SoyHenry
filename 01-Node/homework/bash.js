const commands = require('./commands')
const { split2, done } = require('./util')

/* 2. */
// Output un prompt
process.stdout.write('prompt > ');

// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
    var cmd = data.toString().trim(); // remueve la nueva línea
    const [cmdSplit, args] = split2(cmd)

    if (commands.checkcmd({ cmdSplit, done })) {
        try {
            commands[cmdSplit]({
                args,
                done
            })
        } catch (error) {
            /* console.log(error); */
            done(error.toString())
        }
    }
});
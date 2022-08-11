const split = function (args) {
    const spaceIndex = args.indexOf(' ')
    return spaceIndex === -1
        ? [args, '']
        : [args.slice(0, spaceIndex), args.slice(spaceIndex + 1)]
}

const split2 = args => {
    const split = args.split(' ')
    return [split.shift(), split.join(' ')]
}

const done = result => {
    process.stdout.write(result)
    process.stdout.write('\nprompt > ')
}

const test = () => {
    console.log(Object.keys(process))
    console.log(process.cwd());
}

module.exports = {
    split,
    split2,
    done,
    test
}
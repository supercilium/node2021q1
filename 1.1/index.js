process.stdin.setEncoding('utf-8')
process.stdin.on('data', (data) => {
    const incoming = data.trim()
    if (incoming) {
        process.stdout.write(incoming.split('').reverse().join(''))
    }
})


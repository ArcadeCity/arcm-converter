const ProtoDef = require('protodef').ProtoDef
const Serializer = require('protodef').Serializer
const Parser = require('protodef').Parser
const fs = require('fs')
const zlib = require('zlib')
const protocol = require('./arcm.json')
const proto = new ProtoDef()
proto.addTypes(protocol)
const parser = new Parser(proto, 'packet')
const serializer = new Serializer(proto, 'packet')

let writeIt = function(payload, file) {

    serializer.write(payload)
    serializer.pipe(parser)

    parser.on('data', function (chunk) {
        // console.log(JSON.stringify(chunk, null, 2))

        let firstBuffer = chunk.buffer

        const gzip = zlib.createGzip()

        zlib.deflate(firstBuffer, (err, buffer) => {
            if (!err) {
                // console.log(buffer.toString('base64'))

                fs.writeFile(file, buffer, function(error, data) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('Success - created ' + file)
                    }
                })

            } else {
                console.log('error:', err)
            }
        })
    })
}

module.exports = writeIt

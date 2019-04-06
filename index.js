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

let payload = {
    name: 'arcmodel',
    params: {
        version: 1,
        width: 2,
        height: 2,
        length: 2,
        blocks: [1,1,1,1,1,0,1,1]
    }
}

serializer.write(payload)
serializer.pipe(parser)

parser.on('data', function (chunk) {
    console.log(JSON.stringify(chunk, null, 2))

    let firstBuffer = chunk.buffer

    console.log('So the buffer is:', firstBuffer)

    const gzip = zlib.createGzip()

    zlib.deflate(firstBuffer, (err, buffer) => {
        if (!err) {
            console.log(buffer.toString('base64'))

            fs.writeFile('test10.arcm', buffer, function(error, data) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Success')
                }
            })

        } else {
            console.log('error:', err)
        }
    })
})

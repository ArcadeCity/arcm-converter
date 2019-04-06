const Serializer = require('protodef').Serializer
const ProtoDef = require('protodef').ProtoDef
const Parser = require('protodef').Parser
const fs = require('fs')
const zlib = require('zlib')

const protocol = require('./arcm.json')
const proto = new ProtoDef()

const filename = 'test8.arcm'

proto.addTypes(protocol)

// const parser = new Parser(proto, 'packet')
// const serializer = new Serializer(proto, 'packet')



fs.readFile(filename, function(error, data) {



    console.log(filename + ' data:', data)

    // serializer.read(data)
    //
    // serializer.pipe(parser)
    //
    // parser.on('data', function (chunk) {
    //     console.log('heres what we gots: .....')
    //     console.log(JSON.stringify(chunk, null, 2))
    //
    //     // let firstBuffer = chunk.buffer
    //     //
    //     // console.log('So the buffer is:', firstBuffer)
    //
    // })

    let testum = proto.parsePacketBuffer('packet', data)
    console.log(testum)
    // zlib.unzip(data, function(err, buffer) {
    //     if (!err) {
    //         let testum = proto.parsePacketBuffer('arcmodel', buffer)
    //         console.log(testum)
    //     }
    // });

})

const ProtoDef = require('protodef').ProtoDef
const Serializer = require('protodef').Serializer
const Parser = require('protodef').Parser
const fs = require('fs')
const zlib = require('zlib')

const exampleProtocol = require('./arcm.json')

const proto = new ProtoDef()
proto.addTypes(exampleProtocol)
const parser = new Parser(proto, 'packet')
const serializer = new Serializer(proto, 'packet')

let payload = {
  name: 'entity_look',
  params: {
      entityId: 31,
      yaw: 22,
      pitch: -121,
      onGround: true
  }
}

// let testum = proto.createPacketBuffer('entity_look', payload)

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

            fs.writeFile('test5.arcm', buffer, function(error, data) {
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



    // fs.writeFile('test4.arcm', buffer, function(error, data) {
    //     if (error) {
    //         console.log(error)
    //     } else {
    //         console.log('Success')
    //     }
    // })

})

// console.log('buffer:', testum)
// console.log('-------')
//
// const gzip = zlib.createGzip()
//
// zlib.deflate(testum, (err, buffer) => {
//     if (!err) {
//         console.log(buffer.toString('base64'))
//
//         fs.writeFile('test3.arcm', buffer, function(error, data) {
//             if (error) {
//                 console.log(error)
//             } else {
//                 console.log('Success')
//             }
//         })
//
//     } else {
//         console.log('error:', err)
//     }
// })

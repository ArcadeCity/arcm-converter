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
    'entityId': 1,
    'yaw': 1,
    'pitch': 1,
    'onGround': true
  }
}

let testum = proto.createPacketBuffer('entity_look', payload.params)

console.log('buffer:', testum)
console.log('-------')

const gzip = zlib.createGzip()

zlib.deflate(testum, (err, buffer) => {
    if (!err) {
        console.log(buffer.toString('base64'))

        fs.writeFile('arcd-car8.schematic', buffer, function(error, data) {
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

const ProtoDef = require('protodef').ProtoDef
const Parser = require('protodef').Parser
const fs = require('fs')
const zlib = require('zlib')

const protocol = require('./arcm.json')
const proto = new ProtoDef()

const filename = 'test8.arcm'

proto.addTypes(protocol)

fs.readFile(filename, function(error, data) {

    console.log(filename + ' data:', data)

    let testum = proto.parsePacketBuffer('entity_look', data)
    console.log(testum)
    // zlib.unzip(data, function(err, buffer) {
    //     if (!err) {
    //         let testum = proto.parsePacketBuffer('arcmodel', buffer)
    //         console.log(testum)
    //     }
    // });

})

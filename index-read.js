const ProtoDef = require('protodef').ProtoDef
const Parser = require('protodef').Parser
const fs = require('fs')
const zlib = require('zlib')

const protocol = require('./arcm.json')
const proto = new ProtoDef()

const filename = 'test5.arcm'

proto.addTypes(protocol)

fs.readFile(filename, function(error, data) {

    console.log(filename + ' data:', data)

    zlib.unzip(data, function(err, buffer) {
        if (!err) {
            let testum = proto.parsePacketBuffer('entity_look', buffer)
            console.log(testum)
        }
    });

})

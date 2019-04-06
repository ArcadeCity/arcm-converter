const ProtoDef = require('protodef').ProtoDef
const fs = require('fs')
const zlib = require('zlib')
const protocol = require('./arcm.json')
const proto = new ProtoDef()
const filename = 'test9.arcm'

proto.addTypes(protocol)

fs.readFile(filename, function(error, data) {

    console.log(filename + ' data:', data)

    zlib.unzip(data, function(err, buffer) {
        if (!err) {
            let testum = proto.parsePacketBuffer('packet', buffer)
            console.log(testum)
        }
    });

})

const ProtoDef = require('protodef').ProtoDef
const Parser = require('protodef').Parser
const fs = require('fs')

const protocol = require('./arcm.json')
const proto = new ProtoDef()

const filename = 'test3.arcm'

proto.addTypes(protocol)

fs.readFile(filename, function(error, data) {

    console.log(filename + ' data:', data)

    let testum = proto.parsePacketBuffer('entity_look', data)

    console.log(testum)

})

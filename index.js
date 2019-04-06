const ProtoDef = require('protodef').ProtoDef
const Serializer = require('protodef').Serializer
const Parser = require('protodef').Parser

const exampleProtocol = require('./arcm.json')

const proto = new ProtoDef()
proto.addTypes(exampleProtocol)
const parser = new Parser(proto, 'packet')
const serializer = new Serializer(proto, 'packet')

serializer.write({
  name: 'entity_look',
  params: {
    'entityId': 1,
    'yaw': 1,
    'pitch': 1,
    'onGround': true
  }
})
serializer.pipe(parser)

parser.on('data', function (chunk) {
  console.log(JSON.stringify(chunk, null, 2))
})

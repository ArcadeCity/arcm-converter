var fs = require('fs')
var zlib = require('zlib')
// var ProtoDef = require('protodef').ProtoDef
const ProtoDef = require('protodef').ProtoDef
const Serializer = require('protodef').Serializer
const Parser = require('protodef').Parser

var model = {
    width: 2, // x
    height: 2, // y
    length: 2, // z
    blocks: [1,1,1,0,1,1,1,1]
}

// const protocol = {
//
// }
//
// const proto = new ProtoDef()
// proto.addTypes(protocol)
//
// const parser = new Parser(proto, 'packet')
//
// console.log(proto)

// console.log(model)


// https://github.com/ProtoDef-io/node-protodef/blob/master/example.js
const exampleProtocol = {
  'container': 'native',
  'varint': 'native',
  'byte': 'native',
  'bool': 'native',
  'switch': 'native',
  'entity_look': [
    'container',
    [
      {
        'name': 'entityId',
        'type': 'varint'
      },
      {
        'name': 'yaw',
        'type': 'i8'
      },
      {
        'name': 'pitch',
        'type': 'i8'
      },
      {
        'name': 'onGround',
        'type': 'bool'
      }
    ]
  ],
  'packet': [
    'container',
    [
      {
        'name': 'name',
        'type': [
          'mapper',
          {
            'type': 'varint',
            'mappings': {
              '22': 'entity_look'
            }
          }
        ]
      },
      {
        'name': 'params',
        'type': [
          'switch',
          {
            'compareTo': 'name',
            'fields': {
              'entity_look': 'entity_look'
            }
          }
        ]
      }
    ]
  ]
}

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

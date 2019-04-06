var fs = require('fs')
var zlib = require('zlib')
// var ProtoDef = require('protodef').ProtoDef
const ProtoDef = require('protodef').ProtoDef
const Serializer = require('protodef').Serializer
const Parser = require('protodef').Parser

const protocol = {
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

// var model = {
//     type: 'compound',
//     name: 'Arca Schematic',
//     value: {
//         Width: { // x
//             type: 'short',
//             value: 2
//         },
//         Height: { // y
//             type: 'short',
//             value: 2
//         },
//         Length: { // z
//             type: 'short',
//             value: 2
//         },
//         Blocks: {
//             type: 'byteArray',
//             value: [1,1,1,0,1,1,1,1]
//         }
//     }
// }

var model = require('./test.js')

// var testData = {
//     type: 'byteArray',
//     description: '8-bit byte arrays',
//     data: [1,1,1,1]
// }

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

// const protocol = JSON.stringify(require('./nbt.json'))

const proto = new ProtoDef()
proto.addTypes(JSON.parse(protocol))


// let test = proto.createPacketBuffer('packet', model)



console.log(test)


//
// const parser = new Parser(proto, 'packet')
// const serializer = new Serializer(proto, 'packet')
//
// serializer.write({
//   name: 'entity_look',
//   params: {
//     'entityId': 1,
//     'yaw': 1,
//     'pitch': 1,
//     'onGround': true
//   }
// })
// serializer.pipe(parser)
//
// parser.on('data', function (chunk) {
//   console.log(JSON.stringify(chunk, null, 2))
// })

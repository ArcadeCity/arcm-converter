var nbt = require('prismarine-nbt')
var fs = require('fs')

fs.readFile('arcd-car6.schematic', function(error, data) {
    if (error) throw error;

    nbt.parse(data, function(error, data) {

        console.log(data)

        // console.log(data.value.stringTest.value);
        // console.log(data.value['nested compound test'].value);
    });
});

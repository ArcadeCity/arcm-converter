var nbt = require('prismarine-nbt')
var fs = require('fs')

fs.readFile('arcd-car6.schematic', function(error, data) {
    if (error) throw error;

    nbt.parse(data, function(error, data) {

        console.log(data)

        let testum = nbt.writeUncompressed(data)

        console.log(testum)


        fs.writeFile('arcd-car7.schematic', testum, function(error, data) {
            if (error) {
                console.log(error)
            } else {
                console.log('Success')
            }
        })

        // console.log(data.value.stringTest.value);
        // console.log(data.value['nested compound test'].value);
    });
});

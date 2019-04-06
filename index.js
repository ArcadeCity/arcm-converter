var nbt = require('prismarine-nbt')
var fs = require('fs')
var zlib = require('zlib')

fs.readFile('arcd-car6.schematic', function(error, data) {
    if (error) throw error;

    nbt.parse(data, function(error, data) {

        console.log(data)

        let testum = nbt.writeUncompressed(data)

        console.log(testum)

        const gzip = zlib.createGzip()

        zlib.deflate(testum, (err, buffer) => {
            if (!err) {
                console.log(buffer.toString('base64'))

                fs.writeFile('arcd-car7.schematic', buffer, function(error, data) {
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




        // console.log(data.value.stringTest.value);
        // console.log(data.value['nested compound test'].value);
    });
});

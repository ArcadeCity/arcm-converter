const fs = require('fs');
const VoxReader = require('@sh-dave/format-vox').VoxReader;

fs.readFile("./car.vox", function (err, buffer) {
  if (err) throw err;

  VoxReader.read(buffer, (vox, err) => {
      if (err) {
          console.error(err)
          return
      } else {
          console.log(vox)
      }
  })

});

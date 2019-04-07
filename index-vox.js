const fs = require('fs');
const VoxReader = require('@sh-dave/format-vox').VoxReader;

const file = 'car.vox' // says x 50, y 100, z 23 ... but should be  x 50, y 23, z 100

fs.readFile("./" + file, function (err, buffer) {
  if (err) throw err;

  VoxReader.read(buffer, (vox, err) => {
      if (err) {
          console.error(err)
          return
      } else {
          // console.log(vox)
          // console.log('sizes:', vox.sizes)
          // console.log('palette:', vox.palette)
          // console.log('a model:', vox.models[0][0])

          var models = vox.models[0]

          // First flip the y and z axes
          models.forEach(model => {
              let nowY = model.y
              let nowZ = model.z

              model.z = nowY
              model.y = nowZ
          })

          // Then sort by y, z, x

          // models.sort(
          //     function(a, b) {
          //         if (a.y === b.y) {
          //             return a.z - b.z
          //         }
          //         console.log('hm')
          //         return a.y > b.y ? 1 : -1
          //     }
          // )

          console.log(models)

          console.log(file + ' has ' + models.length + ' voxels.')
          console.log(vox.sizes[0])
          console.log('actual: z is ' + vox.sizes[0].y + ' and y is ' + vox.sizes[0].z)


          // Sort this array to be in ordered by


      }
  })

});

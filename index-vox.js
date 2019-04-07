const fs = require('fs');
const VoxReader = require('@sh-dave/format-vox').VoxReader;
const sleep = require('sleep')

const file = 'car.vox' // says x 50, y 100, z 23 ... but should be  x 50, y 23, z 100

fs.readFile("./" + file, async function (err, buffer) {
  if (err) throw err;

  VoxReader.read(buffer, (vox, err) => {
      if (err) {
          console.error(err)
          return
      } else {
          const width = vox.sizes[0].x
          const height = vox.sizes[0].y // ?? - check .vox y/x inversion
          const length = vox.sizes[0].z

          var models = vox.models[0]

          var i = 0
          var voxels = []

          // First flip the y and z axes
          models.forEach(model => {

              let nowY = model.y
              let nowZ = model.z

              model.z = nowY
              model.y = nowZ

              voxels.push([model.x, model.z, model.y, model.colorIndex])
          })

          // Then sort by y, z, x so we build wide, then long, then tall
          voxels.sort(
              function(a, b) {
                  // If the y axes are the same, then sort by z.
                  if (a[1] === b[1]) {
                      // If the z axes are the same, then sort by x.
                      if (a[2] === b[2]) {
                          return a[0] - b[0]    // sort by x
                      } else {
                          return a[2] - b[2]    // sort by z
                      }
                  }
                  return a[1] > b[1] ? 1 : -1   // sort by y
              }
          )

          // Then add color indexes to the array formatted how reader expects it
          let voxelIds = new Array(width * length * height)

          voxels.forEach(voxel => {
              let index = voxel[1] * width * length + voxel[2] * width + voxel[0]
              // if (index > 200000) {
              //     console.log('UH', voxel)
              // }
              voxelIds[index] = voxel[3]
          })

          console.log(file + ' has ' + models.length + ' voxels.')
          console.log('voxelIds has ' + voxelIds.length + ' color indexes including empties')
          console.log('size:', width, height, length)
      }
  })

});

const fs = require('fs')
const VoxReader = require('@sh-dave/format-vox').VoxReader
const sleep = require('sleep')
const writeIt = require('./index.js')
const file = 'car.vox'

fs.readFile("./" + file, async function (err, buffer) {
  if (err) throw err;

  VoxReader.read(buffer, (vox, err) => {
      if (err) {
          console.error(err)
          return
      } else {
          const width = vox.sizes[0].x
          const height = vox.sizes[0].z
          const length = vox.sizes[0].y

          const palette = vox.palette
          let paletteColors = []

          palette.forEach(color => {
              let { r, g, b, a } = color
              r = r <= 127 ? r : r - 256
              g = g <= 127 ? g : g - 256
              b = b <= 127 ? b : b - 256
              a = a <= 127 ? a : a - 256
              paletteColors.push(r, g, b, a)
          })

          var models = vox.models[0]
          var i = 0
          var voxels = []

          // First flip the y and z axes
          models.forEach(model => {

              let nowY = model.y
              let nowZ = model.z

              model.z = nowY
              model.y = nowZ

              voxels.push([model.x, model.y, model.z, model.colorIndex])
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
              let colorIndex = voxel[3]
              if (colorIndex > 127) {
                  colorIndex -= 256
              }

              voxelIds[index] = colorIndex
          })

          console.log(file + ' has ' + models.length + ' voxels.')
          console.log('voxelIds has ' + voxelIds.length + ' color indexes including empties')
          console.log('size:', width, height, length)
          console.log('Added paletteColor array of length: ', paletteColors.length)

          // Replace undefineds with 0
          for (let v = 0; v < voxelIds.length; v++) {
              if (typeof voxelIds[v] == 'undefined') {
                  voxelIds[v] = 0
              }
          }

          // Build the .arcm payload to be compressed
          let payload = {
              name: 'arcmodel',
              params: {
                  version: 1,
                  width,
                  height,
                  length,
                  blocks: voxelIds,
                  palette: paletteColors
              }
          }

          // Serialize and write to file
          writeIt(payload, file.split('.')[0] + '.arcm')
      }
  })

});

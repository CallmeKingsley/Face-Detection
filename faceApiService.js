const path = require('path')

const tf = require('@tensorflow/tfjs-node')

const faceapi = require('@vladmandic/face-api/dist/face-api.node.js')
const modelPathRoot = './ts-models'

let optionsSSDMobileNet

async function image (file) {
  const decoded = tf.node.decodeImage(file)
  const casted = decoded.toFloat()
  const result = casted.expandDims(0)
  decoded.dispose()
  casted.dispose()
  return result
}

async function detect (tensor) {
  const result = await faceapi.detectAllFaces(tensor, optionsSSDMobileNet)
  return result
}

async function main (file) {
  await faceapi.tf.setBackend('tensorflow')
  await faceapi.tf.enableProdMode()
  await faceapi.tf.ENV.set('DEBUG', false)
  await faceapi.tf.ready()

  const modelPath = path.join(__dirname, modelPathRoot)
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath)
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
    minConfidence: 0.5
  })

  const tensor = await image(file)
  const result = await detect(tensor)

  tensor.dispose()

  return result
}

module.exports = {
  detect: main
}

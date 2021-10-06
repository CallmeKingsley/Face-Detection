const path = require('path')
const canvas = require('canvas')
const { Canvas, Image, ImageData } = canvas
const save = require('./savefile')
const tf = require('@tensorflow/tfjs-node')

const faceapi = require('@vladmandic/face-api/dist/face-api.node.js')
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

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

async function main (file, filename = 'sameImage1.jpeg') {
  // pre set up of tensorflow
  await faceapi.tf.setBackend('tensorflow')
  await faceapi.tf.enableProdMode()
  await faceapi.tf.ENV.set('DEBUG', false)
  await faceapi.tf.ready()

  // applying the model to tensorflow
  const modelPath = path.join(__dirname, modelPathRoot)
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath)

  // determining what is consider accurate face
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
    minConfidence: 0.25
  })

  const tensor = await image(file)

  // detecting the face using the tensorflow trained with the model
  const result = await detect(tensor)

  // close instant
  tensor.dispose()

  const canvasImg = await canvas.loadImage(file)

  const out = await faceapi.createCanvasFromMedia(canvasImg)

  faceapi.draw.drawDetections(out, result)

  save.saveFile(filename, out.toBuffer('image/jpeg'))

  const info = {
    data: result,
    file: file,
    url: `http://localhost:1800/${filename}`
  }

  return info
}

module.exports = {
  detect: main
}

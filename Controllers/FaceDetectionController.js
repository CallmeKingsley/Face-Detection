
const faceApiService = require('../faceApiService')

module.exports = {

  findFaceData: async (req, res) => {
    try {
      if (!req.files) {
        res.status(404).json({
          message: 'No file uploaded'
        })
      } else {
        const result = await faceApiService.detect(req.files.image.data, 'sameimage231.jpeg')
        res.status(200).json({
          data: result
        })
      }
    } catch (e) {
      res.status(500).json({
        error: e
      })
    }
  }
}

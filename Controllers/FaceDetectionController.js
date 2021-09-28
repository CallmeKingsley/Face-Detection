
const faceApiService = require('../faceApiService')

module.exports = {

  findFaceData: async (req, res) => {
    try {
      if (!req.files) {
        res.status(404).json({
          message: 'No file uploaded'
        })
      } else {
        const result = await faceApiService.detect(req.files.image.data)
        res.status(200).json({
          data: {
              data: result,
              number_faces: result.length
          }
        })
      }
    } catch (e) {
      res.status(500).json({
        error: e
      })
    }
  }
}

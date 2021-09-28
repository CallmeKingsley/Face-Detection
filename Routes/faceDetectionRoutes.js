const express = require('express')
const router = express.Router()
const controller = require('../Controllers').FaceDetectionController
const fileUpload = require('express-fileupload')

router.post('/findFaceData', fileUpload(), controller.findFaceData)

module.exports = router

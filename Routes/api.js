const express = require('express')
const router = express.Router()

const faceDectionRoutes = require('./faceDetectionRoutes')

router.use('/face', faceDectionRoutes)

module.exports = router

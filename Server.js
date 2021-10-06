const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const api = require('./Routes/api')
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.static('out'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', api)

app.listen(1800, () => {
  console.log('connected')
})

const mongoose = require('mongoose')
require('dotenv').config()

module.exports = {

  mongoDBConfig () {
    mongoose.connect(
        `mongodb://smart_todoList:${process.env.MongoDB_Pw}@ds229068.mlab.com:29068/${process.env.MongoDB_Username}`
        , (err) => {
          if (err) {
            console.log('something bad happened')
            console.log(err)
          } else {
            console.log('something good happened')
          }
        })
  }

}

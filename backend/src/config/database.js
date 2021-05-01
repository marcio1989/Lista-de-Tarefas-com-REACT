const mongoose = require('mongoose')//abrindo conexão com mongoDB
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://localhost/todo')

/** configurando o moongoDB */
const port = 3003 /** porta do backend para uso do banco de dados */

const bodyParser = require('body-parser')
const express = require('express')//Express servidor web roda em cima do nodes
const server = express()//instancia para startar o servidor express
const allowCors = require('./cors')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)

server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server

/** npm run dev para rodar o servidor
 * mongod para iniciar o banco de dados
 */
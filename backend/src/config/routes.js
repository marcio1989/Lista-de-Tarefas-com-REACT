const express = require('express')

module.exports = function(server) {

    // API Routes realizando rotas da aplicação
    const router = express.Router()
    server.use('/api', router)// rotas especifica para ulr com /api

    // TODO Routes realizando rotas do projeto
    const todoService = require('../api/todo/todoService')
    todoService.register(router, '/todos')
}
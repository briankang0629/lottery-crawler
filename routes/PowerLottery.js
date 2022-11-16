const Express = require('express')
const Router = Express.Router()
const PowerLotteryController = require('../app/Controllers/PowerLotteryController.js')

Router.get('/history', PowerLotteryController.history)
Router.get('/latest', PowerLotteryController.latest)

module.exports = Router

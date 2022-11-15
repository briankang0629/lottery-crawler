const Express = require('express')
const Router = Express.Router()
const TaiwanBigLotteryController = require('../app/Controllers/TaiwanBigLotteryController.js')

Router.get('/history', TaiwanBigLotteryController.history)
Router.get('/latest', TaiwanBigLotteryController.latest)

module.exports = Router

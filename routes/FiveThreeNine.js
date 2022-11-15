const Express = require('express')
const Router = Express.Router()
const FiveThreeNineController = require('../app/Controllers/FiveThreeNinieController.js')

Router.get('/history', FiveThreeNineController.history)
Router.get('/latest', FiveThreeNineController.latest)

module.exports = Router

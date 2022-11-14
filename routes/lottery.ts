const Express = require('express')
const Router = Express.Router()
const CrawlerController = require('../app/Controllers/CrawlerController')

Router.get('/539', CrawlerController.fiveThreeNine)

module.exports = Router

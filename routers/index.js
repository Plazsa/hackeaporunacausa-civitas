var Route =  require('koa-router')
var { login } = require('../controllers')
var bodyParser = require('koa-bodyparser')

var loginroute = new Route()

loginroute.use(bodyParser())

loginroute.post('/login', login.loginUser)

module.exports.loginroute = loginroute;
var Route = require('koa-router')
var {volunteers} = require('../controllers')
var bodyParser = require('koa-bodyparser')

var volunt = new Route()

volunt.use(bodyParser())

volunt.get('/volunteers/:id',volunteers.getVolunteer)
volunt.get('/volunteers',volunteers.getVolunteers)
volunt.post('/register',volunteers.registerVolunteer)
volunt.post('/login',volunteers.login)

module.exports = volunt

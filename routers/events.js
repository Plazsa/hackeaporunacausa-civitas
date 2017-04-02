var Route = require('koa-router')
var {events} = require('../controllers')
var bodyParser = require('koa-bodyparser')

var event = new Route()

event.use(bodyParser())

event.get('/events/:id',event.getEvent)
event.get('/events',event.getEvents)
event.post('events',event.addEvent)

module.exports = event

var Route = require('koa-router')
var { events, check } = require('../controllers')
var bodyParser = require('koa-bodyparser')

var event = new Route()

event.use(bodyParser())

event.get('/events/:id', events.getEvent)
event.get('/events', events.getEvents)
event.post('/events', check, events.addEvent)

module.exports = event

var Route = require('koa-router')
var {communities} = require('../controllers')
var bodyParser = require('koa-bodyparser')

var communt = new Route()

communt.use(bodyParser())

communt.get('/communities/:id',communities.getCommunity)
communt.get('/communities',communities.getCommunities)
communt.post('/communities',communities.addCommunity)

module.exports = communt

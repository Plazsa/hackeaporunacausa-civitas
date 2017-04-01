#!/usr/bin/node --harmony-async-await

const Koa = require('koa'),
    flags = require('flags'),
    r = require('rethinkdb'),
    routers = require('./routers'),
    db = require('./db')

flags.defineInteger('port', 5000, 'Server port')
flags.defineString('rethinkdb-database', 'agora', 'RethinkDB Database to use')
flags.defineString('rethinkdb-host', 'localhost', 'RethinkDB host to use for connection')
flags.defineInteger('rethinkdb-port', 28015, 'RethinkDB port number to use for connection')
flags.parse()

let app = new Koa()

app.listen(flags.get('port'), () => {
    console.info('listening on port', flags.get('port'))
})
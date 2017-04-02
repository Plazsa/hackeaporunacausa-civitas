const Koa = require('koa'),
    logger = require('koa-logger'),
    flags = require('flags'),
    r = require('rethinkdb'),
    routers = require('./routers'),
    db = require('./db'),
    session = require('koa-session')

async function main() {
    flags.defineInteger('port', 5000, 'Server port')
    flags.defineString('rethinkdb-database', 'agora', 'RethinkDB Database to use')
    flags.defineString('rethinkdb-host', 'localhost', 'RethinkDB host to use for connection')
    flags.defineInteger('rethinkdb-port', 28015, 'RethinkDB port number to use for connection')

    flags.parse()

    let options = { db: flags.get('rethinkdb-database'), port: flags.get('rethinkdb-port'), host: flags.get('rethinkdb-host') },
        app = new Koa()

    app.use(logger())
    app.keys = ['some secret hurr'];
    app.use(session(app))
    
    app.use(routers.volunteers.routes())
    app.use(routers.volunteers.allowedMethods())
    app.use(routers.communities.routes())
    app.use(routers.communities.allowedMethods())

    app.listen(flags.get('port'), () => {
        console.info('listening on port', flags.get('port'))
    })
}

module.exports.main = main
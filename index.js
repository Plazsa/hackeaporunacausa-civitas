#!/usr/bin/node --harmony-async-await
const Koa = require('koa'),
    flags = require('flags'),
    r = require('rethinkdb'),
    routers = require('./routers'),
    db = require('./db')

async function main() {
    flags.defineInteger('port', 5000, 'Server port')
    flags.defineString('rethinkdb-database', 'agora', 'RethinkDB Database to use')
    flags.defineString('rethinkdb-host', 'localhost', 'RethinkDB host to use for connection')
    flags.defineInteger('rethinkdb-port', 28015, 'RethinkDB port number to use for connection')
    
    flags.parse()

    let tables = ['volunteers', 'events', 'communities', 'comments', 'announcements'],
        options = { db: flags.get('rethinkdb-database'), port: flags.get('rethinkdb-port'), host: flags.get('rethinkdb-host') }

    try {
        let conn = await db.connect(options)
        let results = await db.makeTables({tables, conn, database: flags.get('rethinkdb-database')})
        await conn.close()

        console.log(`${results.length} ${ results.length === 1 ? 'table': 'tabbles' } created.`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

    let app = new Koa()

    app.listen(flags.get('port'), () => {
        console.info('listening on port', flags.get('port'))
    })
}

main()


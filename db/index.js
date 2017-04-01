const r = require('rethinkdb')



/**
 * connects to a rethinkdb database
 * 
 * @export
 * @param {any} { port = 28015, host = 'localhost', db } 
 * @returns {Connection} conn
 */
module.exports.connect = async function connect({ port = 28015, host = 'localhost', db = 'test' }) {
    return await r.connect({
        port: port,
        host: host,
        db: db,
    })
}


/**
 * creates the tables it was sent out to make on the database you choose
 * 
 * @export
 * @param {any} { conn, database = "", tables = string[] } 
 * @returns {CreateResult} results
 */
module.exports.makeTables = async function makeTables({ conn, database = "test", tables = [] }) {

    let databases = await r.dbList().run(conn)

    if (databases.indexOf(database) === -1) {
        throw new Error(`Database ${database} was not found.`)
    }

    let db = r.db(database),
        list = await db.tableList().run(conn)

    // only create tables that don't exist
    tables = tables.filter(table => {
        if (list.indexOf(table) === -1) {
            return table
        }
    })

    // create tables and map the resutls of their creation
    return await Promise.all(tables.map(async table => {
        return await db.tableCreate(table).run(conn)
    }))
}
const r = require('rethinkdb')



/**
 * connects to a rethinkdb database
 * 
 * @export
 * @param {any} { port = 28015, host = 'localhost', db } 
 * @returns {any} { conn = rethinkdb.Connection|undefined, err = Error|undefined }
 */
export async function connect({ port = 28015, host = 'localhost', db }) {
    try {
        let conn = await r.connect({
            port: port,
            host: host,
            db: db,
        })
        return { conn }
    } catch (err) {
        return { err }
    }
}


/**
 * creates the tables it was sent out to make on the database you choose
 * 
 * @export
 * @param {any} { conn, database = "", tables = string[] } 
 * @returns {any} { results = rethinkdb.CreateResult[]|undefined, err = Error|undefined }
 */
export async function makeTables({ conn, database = "test", tables = [] }) {
    try {
        let databases = await r.dbList().run(conn)

        if (databases.indexOf(database) === -1) {
            throw new Error(`Database ${database} was not found.`)
        }

        let db = r.db(database),
            list = await db.tableList().run(conn)

        // only create tables that don't exist
        tables = tables.map(table => {
            if (list.indexOf(table) !== -1) {
                return table
            }
        })

        // create tables and map the resutls of their creation
        let results = tables.map(table => {
            return await db.tableCreate(table).run(conn)
        })

        return { results }
    } catch (err) {
        return { err }
    }
}
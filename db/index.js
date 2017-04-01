const r = require('rethinkdb')


/**
 * connects to a rethinkdb database
 * 
 * @export connect
 * @param {Object} options connection options such as port, host, and db
 * @returns {Connection|Error} 
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
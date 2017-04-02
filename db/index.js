// Package db
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
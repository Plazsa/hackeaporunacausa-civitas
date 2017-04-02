var { events } = require('../models')
var db = require('../db')

var ev = new events.Events()

module.exports.getEvents = async function (ctx) {
    var conn = await db.connect({})
    var list = await ev.list(conn)
    await conn.close()

    ctx.body = list

}

module.exports.getEvent = async function (ctx) {
    var conn = await db.connect({})
    var res = await ev.getByID({ id: ctx.params.id }, conn)
    await conn.close()

    ctx.body = res
}

module.exports.addEvent = async function (ctx) {
    var conn = await db.connect({})
    
    try {
        var v = new events.Event(ctx.request.body)
        ctx.body = { id: await ev.save({ event: v }, conn) }
    }
    catch (e) {
        ctx.body = e.message
    }
    finally {
        conn.close()
    }

}


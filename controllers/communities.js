var { communities } = require('../models')
var db = require('../db')

var cm = new communities.Communities()

function checkLogin(ctx) {
    return ctx.session.signedIn ? true : false
}

module.exports.getCommunities = async function (ctx) {
    var conn = await db.connect({})
    var list = await cm.list(conn)
    await conn.close()

    ctx.body = list

}

module.exports.getCommunity = async function (ctx) {
    var conn = await db.connect({})
    var res = await cm.getByID({ id: ctx.params.id }, conn)
    await conn.close()

    ctx.body = res
}

module.exports.addCommunity = async function (ctx) {

    var conn = await db.connect({});
    try {
        var v = new communities.Community(ctx.request.body)
        ctx.body = { id: await cm.save({community: v}, conn) }
    }
    catch (e) {
        ctx.response.status = 500
        ctx.body = e.message
    }
    finally {
        conn.close()
    }

}


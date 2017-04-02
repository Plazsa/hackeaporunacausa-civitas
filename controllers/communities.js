var {communities} = require('../models')
var db = require('../db')

var cm = new communities.Communities()

module.exports.getCommunities = async function(ctx){
    var conn = await db.connect()
    var list = await cm.list(conn)
    await conn.close()

    ctx.body = list

}

module.exports.getCommunity = async function(ctx){
    var conn = await db.connect()
    var res = await cm.getByID({id:ctx.params.id},conn)
    await conn.close()

    ctx.body = res
}

module.exports.addCommunity = async function(ctx){
    var conn = await db.connect();
    try{
       
        var v = new communities.Community(ctx.request.body)
        ctx.body = await cm.save(v)
        
    }
    catch(e)
    {
        ctx.body = e.message
    }
    finally{
         conn.close()
    }

}


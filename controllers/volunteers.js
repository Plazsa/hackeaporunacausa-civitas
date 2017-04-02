var {volunteers} = require('../models')
var md = require('md5')
var db = require('../db')

var vs = new volunteers.Volunteers();

module.exports.getVolunteers = async function(ctx){
    var conn = await db.connect({})
    var list = await vs.list(conn)
    await conn.close()

    ctx.body = list

}

module.exports.getVolunteer = async function(ctx){
    var conn = await db.connect({})
    var res = await vs.getByID({id:ctx.params.id},conn)
    await conn.close()

    ctx.body = res
}

module.exports.registerVolunteer = async function(ctx){
    var conn = await db.connect({});
    try{
        var hash = md5(ctx.request.body.password)
        ctx.request.body.hash = hash
        var v = new volunteers.Volunteer(ctx.request.body)
        ctx.body = await vs.save(v)
        
    }
    catch(e)
    {
        ctx.body = e.message
    }
    finally{
         conn.close()
    }

}

module.exports.login = async function(ctx){
    var conn = await db.connect({});
    try{
        var hash = md5(ctx.request.body.password)
        var volunteer = vs.getByEmail({email:ctx.request.body.email})
        if(volunteer.hash==hash)
        {
            ctx.session.signedIn = true;
            ctx.session.isNew = true;
            ctx.body = "LoggedIn"
            return
        }
        ctx.body = "FAILED!!!"
        
    }
    catch(e)
    {
        ctx.body = e.message
    }
    finally{
         conn.close()
    }

}
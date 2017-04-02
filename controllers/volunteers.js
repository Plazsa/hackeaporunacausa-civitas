var { volunteers } = require('../models')
var md5 = require('md5')
var db = require('../db')

var vs = new volunteers.Volunteers();

module.exports.getVolunteers = async function (ctx) {
    try {
        var conn = await db.connect({})
    } catch (error) {
        ctx.response.status = 500
        ctx.body = e.message
        return
    }

    try {
        var list = await vs.list(conn)
        ctx.body = list.map(v => {
            j = v.toJSON()
            delete j.hash
            return j
        })
    } catch (error) {
        ctx.response.status = 500
        ctx.body = e.message
    } finally {
        await conn.close()
    }



}

module.exports.getVolunteer = async function (ctx) {
    var conn = await db.connect({})

    try {
        var res = await vs.getByID({ id: ctx.params.id }, conn)
        let body = res.toJSON()
        delete body.hash
        ctx.body = body
    } catch (e) {
        ctx.response.status = 500
        ctx.body = e.message
    } finally {

        await conn.close()
    }
}

module.exports.registerVolunteer = async function (ctx) {
    var conn = await db.connect({});
    try {
        var hash = md5(ctx.request.body.password)
        ctx.request.body.hash = hash
        var v = new volunteers.Volunteer(ctx.request.body)
        console.log(v.toJSON())
        let id = await vs.save({ volunteer: v }, conn)

        ctx.response.status = 200
        ctx.body = { id }

    }
    catch (e) {
        ctx.response.status = 500
        ctx.body = e.message
    }
    finally {
        conn.close()
    }

}

module.exports.login = async function (ctx) {
    var conn = await db.connect({});

    try {
        var hash = md5(ctx.request.body.password)
        var volunteer = await vs.getByEmail({ email: ctx.request.body.email }, conn)

        if (volunteer.hash === hash) {
            ctx.session.signedIn = true;
            ctx.body = { id: volunteer.ID }
            return
        }

        ctx.body = "FAILED!!!"
        ctx.response.status = 400

    }
    catch (e) {
        ctx.body = e.message
    }
    finally {
        conn.close()
    }

}
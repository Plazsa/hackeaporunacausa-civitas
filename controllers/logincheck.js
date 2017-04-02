module.exports.check = async function(ctx, next) {
    if (!ctx.session.signedIn) {
        ctx.throw(401, 'access_denied');
    }

    await next()
}
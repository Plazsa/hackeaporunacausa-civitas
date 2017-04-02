
exports.loginUser = function (ctx) {
    console.log(ctx.request.body)

    if (ctx.request.body.username == 'Jose' && ctx.request.body.password == '123pescao') {
        ctx.session.signedIn = true;
        ctx.session.userID = 'Jose';
        ctx.body = "HelloJose!"
        console.log('Done')

    }

};

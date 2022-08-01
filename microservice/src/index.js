'use strict'

var Seneca = require('seneca')
var Express = require('express')
var Web = require('seneca-web')

var Routes = [{
    prefix: '/api',
    pin: 'role:api,cmd:*',
    map: {
        store_item: {
            GET: true,
            POST: true,
        },
        auth: {
            GET: true,
            POST: true,
        }
    }
}]
var seneca = Seneca()

var config = {
    routes: Routes,
    adapter: require('seneca-web-adapter-express'),
    context: Express()
}

seneca.client()
    .use(Web, config)
    .ready(() => {
        var server = seneca.export('web/context')()
        server.listen('4000', () => {
            console.log('server started on: 4000')
        })
    })

seneca.add({ role: 'api', cmd: 'store_item' }, function (args, done) {
    done(null, { response: "storeItem" });
});

seneca.add({ role: 'api', cmd: 'auth' }, function (args, done) {
    done(null, { response: "auth" });
});
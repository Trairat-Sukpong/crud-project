// 'use strict'

// var Seneca = require('seneca')
// var Express = require('express')
// var Web = require('seneca-web')

// var Routes = [{
//     prefix: '/api',
//     pin: 'role:api,cmd:*',
//     map: {
//         store_item: {
//             GET: true,
//             POST: true,
//         },
//         auth: {
//             GET: true,
//             POST: true,
//         },
//         test: {
//             GET: true,
//             POST: true,
//         }
//     }
// }]
// var seneca = Seneca()

// var config = {
//     routes: Routes,
//     adapter: require('seneca-web-adapter-express'),
//     context: Express()
// }

// seneca.client()
//     .use(Web, config)
//     .ready(() => {
//         var server = seneca.export('web/context')()
//         server.listen('4000', () => {
//             console.log('server started on: 4000')
//         })
//     })


// seneca.add({ role: 'api', cmd: 'store_item' }, function (args, done) {
//     done(null, { response: "storeItem" });
// });

// seneca.add({ role: 'api', cmd: 'auth' }, function (args, done) {
//     done(null, { response: "auth" });
// });

// seneca.act({ role: 'api', cmd: 'test' })



const Express = require('express');
const Router = Express.Router;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRouter = require('./auth');
const context = new Router();
const SenecaWeb = require('seneca-web');

const jwtMiddleware = require("../middleware/jwt_middleware");

require("dotenv").config();
require('../database/db');
require("../config/passportConfig")(passport);

var senecaWebConfig = {
      context: context,
      adapter: require('seneca-web-adapter-express'),
      options: {
            parseBody: false,
            includeRequest: true,
            includeResponse: true
      },
      middleware: {
            'jwt_middleware': jwtMiddleware,
      },
}

Express()
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(cors({
            origin: ["http://localhost:3000", "http://10.8.24.144:3000"],
            credentials: true,
      }))
      .use(
            session({
                  secret: "express-auth",
                  resave: true,
                  saveUninitialized: true,
                  cookie: { maxAge: 3600000, sameSite: 'strict' }
            })
      )
      .use(cookieParser("express-auth"))
      .use(passport.initialize())
      .use(passport.session())
      .use('/api/auth', authRouter)
      .use(context)
      .listen(4000)


require('seneca')({
      timeout: 5000,
      debug: {
            undead: true
      }
})
      .use(SenecaWeb, senecaWebConfig)
      .use('api-profile')
      .use('api-item')
      .client({ type: 'tcp', port: 8081, pin: 'role:profile' })
      .client({ type: 'tcp', port: 8082, pin: 'role:item' })


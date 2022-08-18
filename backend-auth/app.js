

module.exports = function math(options) {

  const Express = require('express');
  const cookieParser = require('cookie-parser');
  const session = require('express-session');
  const passport = require('passport');
  const bodyParser = require('body-parser');
  const bcrypt = require('bcrypt');
  const jwt = require("jsonwebtoken");

  const User = require('../../models/User');

  require("dotenv").config();
  require('./database/db');
  require("./config/passportConfig")(passport);

  Express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
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

  this.add('role:auth,cmd:login', (msg, respond) => {

    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.json({ status: "error", msg: "No User Exists" });
      else {

        // req.logIn(user, (err) => {
        //   if (err) throw err;
          const token = jwt.sign(
            { user_id: user._id },
            process.env.TOKEN_KEY_ACCESS,
            {
              expiresIn: "2h",
            }
          );

          // save user token
          msg.session.passport.username = user.username;
          msg.session.passport.token = token;

          console.log(msg);
          // res.json({ status: "ok", msg: "Successfully Authenticated", token: token });
          // console.log(req.logIn);
          // console.log(req.session);
      //   });
      }
    })();


  })

}

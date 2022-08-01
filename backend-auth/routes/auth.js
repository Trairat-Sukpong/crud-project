const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const jwt = require("jsonwebtoken");


const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { username, password, name } = req.body;

  // simple validation
  if (!name || !username || !password) {
    return res.send('register', { message: 'Please try again' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);


  User.findOne({ username }, async (err, data) => {
    if (err) {
      res.json({ err })
    }
    if (!data) {
      const user = new User({
        name,
        username,
        password: passwordHash
      });
      await user.save();
      res.json({ st: "success" });
    } else {
      res.json({ st: "user is already" });
    }
  })

});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.json({ status: "error", msg: "No User Exists" });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        const token = jwt.sign(
          { user_id: user._id },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        // save user token
        req.session.passport.username = user.username;
        req.session.passport.token = token;
       
        // console.log(req.session);
        res.json({ status: "ok", msg: "Successfully Authenticated", token: token });

        // console.log(req.session);
      });
    }
  })(req, res, next);
});

router.post('/logout', (req, res) => {

  req.logout(function (err) {
    if (err) { return next(err); }
    req.session.destroy(null);
    res.clearCookie("connect.sid", { path: '/' });
    res.send("Successfully");
    // console.log(req.headers.cookie)
  });

});

router.post("/refresh_token", (req, res, next) => {

  if (req.session.passport !== undefined) {
    const token = jwt.sign(
      { user_id: req.session.passport.user },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    // user.token = token;
    res.json({ status: "ok", msg: "Successfully Authenticated", token: token });
  } else {
    res.json({ status: "err", msg: "Unauthenticated" });
  }


});

router.post("/is_auth", (req, res, next) => {

  // console.log(req.session.passport);
  let session = true
  if (req.session.passport === undefined){
     session = false
     req.session.destroy(null);
     res.clearCookie("connect.sid", { path: '/' });
  }


  res.json({ session })

});


module.exports = router;
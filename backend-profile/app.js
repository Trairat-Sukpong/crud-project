module.exports = function profile(options) {

  const User = require('./models/User');

  this.add('role:profile,cmd:user', (msg, respond) => {

    User.findOne({}, async (err, data) => {
      if (err) throw console.log(err)
      respond(null, { answer: data })
    })
  })

}

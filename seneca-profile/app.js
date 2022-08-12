module.exports = function profile(options) {

  const User = require('./models/User');

  this.add('role:profile,cmd:user', (msg, respond) => {

    respond(null, { answer: msg.req.user })

  })

}

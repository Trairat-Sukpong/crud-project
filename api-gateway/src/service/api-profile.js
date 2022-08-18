module.exports = function api(options) {
  var valid_ops = {
    user: 'user'
  }

  this.add({ role: 'api', path: 'profile' }, function (msg, respond) {
    var operation = msg.args.params.operation
    // console.log(msg.request$);
    this.act('role:profile', {
      cmd: valid_ops[operation],
      req: msg.request$,
      res: msg.response$
    }, respond)

  })

  this.add('init:api', function (msg, respond) {
    // console.log(msg.request$);
    this.act('role:web', {
      routes: {
        prefix: '/api',
        pin: 'role:api,path:*',
        map: {
          profile: {
            POST: true,
            suffix: '/:operation',
            middleware: 'jwt_middleware'
          }
        }
      }
    }, respond)
  })

}

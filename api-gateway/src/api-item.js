module.exports = function api(options) {
  var seneca = require('seneca')();
  var Promise = require('bluebird');
  var act = Promise.promisify(seneca.act, { context: seneca });

  var valid_ops = {
    get: 'get',
    create: 'create',
    update: 'update',
    delete: 'delete'
  }

  this.add({ role: 'api', path: 'item' }, function (msg, respond) {
    // msg.routes.middleware()
    var operation = msg.args.params.operation
    // console.log(msg);
    this.act('role:item', {
      cmd: valid_ops[operation],
      req: msg.request$,
      res: msg.response$
    }, (err, res) => {
      if (err) throw respond(err)
      respond(res)
    })
  })

  this.add('init:api', function (msg, respond) {
    this.act('role:web', {
      routes: {
        prefix: '/api',
        pin: 'role:api,path:*',
        map: {
          item: {
            POST: true,
            suffix: '/:operation',
            middleware: 'jwt_middleware'
          }
        }
      }
    }, respond)
  })

}

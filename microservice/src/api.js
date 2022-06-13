module.exports = function api(options) {

  var valid_ops = {
    get: 'get',
    create: 'create',
    edit: 'edit',
    delete: 'delete'
  }

  this.add('role:api,path:item', function (msg, respond) {
    var operation = msg.args.params.operation
    this.act('role:math', {
      cmd: valid_ops[operation],
    }, respond)
  })


  this.add('init:api', function (msg, respond) {
    this.act('role:web', {
      routes: {
        prefix: '/api',
        pin: 'role:api,path:*',
        map: {
          item: { POST: true, suffix: '/:operation' }
        }
      }
    }, respond)
  })

}

// const seneca = require('seneca')();

// let hello = (msg, reply) => {
//     reply(null, {answer: ('Hello ' + msg.name)})
// };
// seneca.add('service:hello', hello).listen();

require('seneca')()

    .add('service:get')
    .add('service:create')
    .add('service:edit')
    .add('service:delete')
    .listen()


// require('seneca')()

//   .use('getItem')
//   .use('createItem')
//   .use('editItem')
//   .use('deleteItem')

//   // listen for role:math messages
//   // IMPORTANT: must match client
//   .listen({ type: 'tcp'})
  
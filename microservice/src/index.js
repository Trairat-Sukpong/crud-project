const seneca = require('seneca')();

// let hello = (msg, reply) => {
//     reply(null, {answer: ('Hello ' + msg.name)})
// };
// seneca.add('service:hello', hello).listen();

seneca.add('service:get');
seneca.add('service:create');
seneca.add('service:edit');
seneca.add('service:delete');
seneca.listen();



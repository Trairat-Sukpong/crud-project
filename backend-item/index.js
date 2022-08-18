require('./database/db');
require('seneca')()

  .use('app')

  // listen for role:math messages
  // IMPORTANT: must match client
  .listen({ type: 'tcp', port: 8082, pin: 'role:item' })
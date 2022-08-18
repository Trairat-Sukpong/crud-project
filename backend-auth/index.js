require('seneca')()

    .use('app')

    // listen for role:math messages
    // IMPORTANT: must match client
    .listen({ type: 'tcp', port: 8083, pin: 'role:auth' })
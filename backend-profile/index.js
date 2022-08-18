const Seneca = require('seneca');
const seneca = Seneca();

require('./database/db');

seneca.use('app');
seneca.listen({ type: 'tcp', port: 8081, pin: 'profile' });
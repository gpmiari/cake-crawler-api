const server = require('./config');
require('dotenv').config();
const pkg = require('./package.json');

const serverPort = process.env.PORT;

const shutdown = event => () => {
    console.warn('Server receive signal to shutdown, with event %s', event);
    process.exit(0);
};

process.title = pkg.name;

process.on('SIGTERM', shutdown('SIGTERM'))
  .on('SIGINT', shutdown('SIGINT'))
  .on('SIGHUP', shutdown('SIGHUP'))
  .on('uncaughtException', (er) => {
    console.error(`uncaughtException caught the error: ${er.message}`);
    throw er;
  })
  .on('exit', (code) => {
    console.info('Node process exit with code: %s', code);
    // database.close();
  });
server.listen(serverPort, (err) => {
  if (err) {
    console.error('Error on listen port. ', err.message);
  } else {
    console.info('------------------------------------------------------------------');
    console.info(`${pkg.name} - Version: ${pkg.version}`);
    console.info('------------------------------------------------------------------');
    console.info(`Express server listening on port: ${serverPort}`);
    console.info('------------------------------------------------------------------');
  }
  server.on('close', () => {
    console.info('Shutdown the application server');
  });
});

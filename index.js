const container = require('./src/container');
const server = container.resolve('server');

server.start()
    .then(() => {
        console.log('SERVER STARTED');
    })
    .catch((err) => {
        process.exit();
    });

process.on('unhandledRejection', (err) => {
    console.log('\n### CRUDE ERROR ###\n', err);
})
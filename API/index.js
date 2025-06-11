const Server = require('./src/app');

const startServer = async () => {
    try {
        const server = new Server();
        server.listen();
    } catch (error) {
        console.error('Error starting the application:', error.message);
        process.exit(1);
    }
};
module.exports = startServer();

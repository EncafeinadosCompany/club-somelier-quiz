const { connectToDatabase, sequelize } = require('./config/connection');
const routerApi = require('./routes/index');
const express = require('express');
const cors = require('cors');

require('dotenv').config();


const { createServer } = require('http');
const { Server: SocketServer } = require('socket.io');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.host = process.env.DB_HOST || 'localhost';
    this.httpServer = createServer(this.app);

    this.io = new SocketServer(this.httpServer, {
      cors: {
        origin: "*"
      }
    });

    this.initializeWebSockets();
    this.middlewares();
    this.routers();
    this.syncDataBase();
  }

  middlewares() {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
  }

  routers() {
    routerApi(this.app);
  }

  initializeWebSockets() {
    this.io.on('connection', (socket) => {
      console.log('🔌 Socket conectado:', socket.id);

      socket.on('join-event', (eventId) => {
        socket.join(`event-${eventId}`);
      });

      socket.on('disconnect', () => {
        console.log('❌ Socket desconectado:', socket.id);
      });
    });
  };

  async syncDataBase() {
    try {
      await connectToDatabase();
      await sequelize.sync({ force: true });

    } catch (error) {
      console.error('Error connecting to the database:', error.message);
      throw error;
    }
  }

  listen() {
    this.httpServer.listen(this.port, () => {
      console.log(`\n🚀 Server running at http://${this.host}:${this.port}`);
    });
  }
}

module.exports = Server;
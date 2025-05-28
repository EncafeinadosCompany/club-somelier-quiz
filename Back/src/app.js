const { connectToDatabase, sequelize } = require('./config/connection');
const routerApi = require('./routes/index');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.host = process.env.DB_HOST || 'localhost';

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
    this.app.listen(this.port, () => {
      console.log(`\n🚀 Server running at http://${this.host}:${this.port}`);
    });
  }
}

module.exports = Server;
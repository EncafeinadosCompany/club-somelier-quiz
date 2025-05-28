const express = require('express');

const routerApi = (app) => {

    const router = express.Router();

    app.use('/api/v1', router);

    router
        .use('/participants', require('./participants.routes'))

}

module.exports = routerApi;
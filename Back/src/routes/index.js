const express = require('express');

const routerApi = (app) => {

    const router = express.Router();

    app.use('/api/v1', router);

    router
        .use('/users', require('./user.routes'))

}

module.exports = routerApi;
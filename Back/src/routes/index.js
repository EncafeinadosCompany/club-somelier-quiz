const express = require('express');

const routerApi = (app) => {

    const router = express.Router();

    app.use('/api/v1', router);

    router
        .use('/participants', require('./participants.routes'))
        .use('/events', require('./event.routes'))
        .use('/categories', require('./category.routes'))
        // .use('/questionnaires', require('./questionnaire.routes'))

}

module.exports = routerApi;
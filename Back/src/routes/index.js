const express = require('express');

const routerApi = (app) => {

    const router = express.Router();

    app.use('/api/v1', router);

    router
        .use('/auth', require('./auth.routes'))
        .use('/levels', require('./level.routes'))
        .use('/categories', require('./category.routes'))
        .use('/questions', require('./question.routes'))

        .use('/participants', require('./participants.routes'))
        .use('/events', require('./event.routes'))
        .use('/admin', require('./admin.routes'))
    // .use('/questionnaires', require('./questionnaire.routes'))

}

module.exports = routerApi;
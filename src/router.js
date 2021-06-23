const express = require('express');
const controller = require('./utilities/createController');
const cors = require('cors');
const bodyparser = require('body-parser');
const router = express.Router();

module.exports = ({ config }) => {
    const corsOptions = { origin: config.corsOrigin };
    router.use(cors(corsOptions));
    router.use(bodyparser.json());

    router.use('/default', controller('default'));
    router.use('/order', controller('orders'));
    // router.use('/lead', controller('lead'));
    return router;
}
const container = require('../container');
const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/', (req, res) => {
        res.send('Welcome To My Default Page !!');
    })
    return router;
}
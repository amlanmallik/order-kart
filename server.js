const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const CI = require('./common-layer/common-interface');
const PORT = CI.serverConfig.port;
const CORS = CI.serverConfig.corsOption;

app.use(cors(CORS));

app.listen(PORT, () => {
    console.log('Listening on : ', PORT);
})
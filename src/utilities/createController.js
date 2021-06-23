const path = require('path');

function createController(controllerUri) {
    const controllerPath = path.resolve(__dirname, '../controllers', controllerUri);
    const Controller = require(controllerPath);
    return Controller();
}

module.exports = createController;
const awilix = require('awilix');
const server = require('./server');
const router = require('./router');
const config = require('./configuration/server-config');
const db = require('./models/index');
const orderRepo = require('./repo/order');
const inventoryRepo = require('./repo/inventory');
const logger = require('./utilities/logger');
const wrapResponse = require('./utilities/responseWrapper');

const { createContainer, asValue, asFunction } = awilix;
const container = createContainer();

container.register({
    server: asFunction(server).singleton(),
    router: asFunction(router).singleton(),
    db: asFunction(db).singleton(),
    config: asValue(config),
    logger: asFunction(logger).singleton(),
    wrapResponse: asFunction(wrapResponse).singleton(),
    orderRepo: asFunction(orderRepo).singleton(),
    inventoryRepo: asFunction(inventoryRepo).singleton()
})

module.exports = container

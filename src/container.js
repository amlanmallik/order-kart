const awilix = require('awilix');
const server = require('./server');
const router = require('./router');
const config = require('./configuration/server-config');
const db = require('./models/index');
const orderRepo = require('./repo/order');
const inventoryRepo = require('./repo/inventory');
const authMiddleware = require('./middlewares/auth');
const logger = require('./utilities/logger');

const { createContainer, asValue, asFunction } = awilix;
const container = createContainer();

container.register({
    server: asFunction(server).singleton(),
    router: asFunction(router).singleton(),
    db: asFunction(db).singleton(),
    config: asValue(config),
    authMiddleware: asFunction(authMiddleware).singleton(),
    logger: asFunction(logger).singleton(),
    orderRepo: asFunction(orderRepo).singleton(),
    inventoryRepo: asFunction(inventoryRepo).singleton()
})

module.exports = container

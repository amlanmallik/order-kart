const Sequelize = require('sequelize');
const fs = require('fs');

module.exports = ({ config }) => {
    const sequelize = new Sequelize(
        config.dbName,
        config.dbUser,
        config.dbPassword,
        {
            host: config.dbHost,
            dialect: config.dbType,
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        },
    );

    let models = {};
    fs.readdirSync(__dirname).forEach((file) => {
        if (file === 'index.js') return;
        const factory = require(`./${file}`);
        const model = factory(sequelize, Sequelize);
        models[model.name] = model;
    });

    Object.keys(models).forEach((key) => {
        if ('associate' in models[key]) {
            models[key].associate(models);
        }
    });

    sequelize.sync().then(() => { console.log('Databases created successfully') })

    return {
        ...models,
        sequelize,
        Sequelize,
    }
};

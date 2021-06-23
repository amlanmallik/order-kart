module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define('Orders',
        {
            orderId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            quantity: { type: DataTypes.INTEGER },
            status: { type: DataTypes.BOOLEAN, defaultValue: true },
            createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
            updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
        }, {}
    )
    Orders.associate = function (models) {
        models.Orders.belongsTo(models.Inventory)
    }
    return Orders;
}
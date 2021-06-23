module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define('Inventory',
        {
            itemId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            itemName: { type: DataTypes.STRING },
            quantity: { type: DataTypes.INTEGER },
            status: { type: DataTypes.BOOLEAN, defaultValue: true },
            createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
            updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
        }, {}
    )
    // Inventory.associate = function (models) {
    //     console.log('mod ', models);
    //     models.Inventory.hasMany(models.Orders)
    // }
    return Inventory;
}
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users',
        {
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userName: { type: DataTypes.STRING },
            status: { type: DataTypes.BOOLEAN, defaultValue: true },
            createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
            updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
        }, {}
    )
    Users.associate = function (models) {
        models.Users.hasMany(models.Orders)
    }
    return Users;
}
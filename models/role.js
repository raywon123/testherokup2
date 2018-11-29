module.exports = function (sequelize, DataTypes) {
    const Role = sequelize.define("role", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            field: 'id',
        },
        role: {
            type: DataTypes.STRING,
            unique: true
        },
        
    },
        {
            timestamps: false,

    });
    return Role;
};

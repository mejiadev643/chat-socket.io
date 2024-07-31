module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('group', {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
        },
        name: {
        type: DataTypes.STRING,
        allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Group.associate = (models) => {
        Group.belongsToMany(models.User, {
            through: 'group_users',
            foreignKey: 'group_id',
            otherKey: 'user_id'
        });
    };
    
    return Group;
    }
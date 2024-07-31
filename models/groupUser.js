module.exports = (sequelize, DataTypes) => {
    const GroupUser = sequelize.define('group_users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        group_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'groups',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE'
        }
    }, {
        timestamps: false
    });

    return GroupUser;
};
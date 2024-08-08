module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('messages', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    group_id: {
      type: DataTypes.UUID,
      references: {
        model: 'groups',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    user_send_id: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    user_receive_id: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Message.associate = models => {
    Message.belongsTo(models.Group, {
      foreignKey: 'group_id',
      onDelete: 'CASCADE'
    });
    Message.belongsTo(models.User, {
      as: 'sended',
      foreignKey: 'user_send_id',
      onDelete: 'CASCADE'
    });
    Message.belongsTo(models.User, {
      as: 'received',
      foreignKey: 'user_receive_id',
      onDelete: 'CASCADE'
    });
  };

  return Message;
};
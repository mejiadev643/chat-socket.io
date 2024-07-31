const { Sequelize } = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const config = require('../config/config.js');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    port: config.development.port,
    dialect: config.development.dialect
  }
);

const models = {
  User: require('./user')(sequelize, DataTypes),
  Group: require('./group')(sequelize, DataTypes),
  GroupUser: require('./groupUser')(sequelize, DataTypes),
  Message: require('./message')(sequelize, DataTypes),
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;

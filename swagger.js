const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const path = require('path');

// Load the swagger.yaml file
const swaggerDocument = yamljs.load(path.join(__dirname, 'docs', 'users.yaml'));

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
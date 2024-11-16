const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'studentskidogodki',
  location: 'europe-central2'
};
exports.connectorConfig = connectorConfig;


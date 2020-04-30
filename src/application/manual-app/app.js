// app.js

// Infrastructure

const fileConfigRepository = require('../../infrastructure/file/fileConfigRepository');
const memConfigRepository = require('../../infrastructure/memory/memConfigRepository');

// const log = require('../../infrastructure/log/consoleLogger');
const log = require('../../infrastructure/log/logColorLogger');

// Interface Adapters

const configAdapterController = require('../../adapter/controller/configAdapterController');
const cachedConfigAdapterController = require('../../adapter/controller/cachedConfigAdapterController');
const configJSONPresenter = require('../../adapter/presenter/configJSONPresenter');
const configYAMLPresenter = require('../../adapter/presenter/configYAMLPresenter');

// Init

// Execution

function getConfigInJSON() {
  return configAdapterController.getConfig(fileConfigRepository, configJSONPresenter, log, 'chassis.yml');
}

function getConfigInYAML() {
  return configAdapterController.getConfig(fileConfigRepository, configYAMLPresenter, log, 'chassis.yml');
}

function getCachedConfig() {
  return cachedConfigAdapterController.getCachedConfig(memConfigRepository, fileConfigRepository, configJSONPresenter, log, 'chassis.yml');
}

function getCachedConfigWithRefresh() {
  return cachedConfigAdapterController.getCachedConfig(memConfigRepository, fileConfigRepository, configJSONPresenter, log, 'chassis.yml', true);
}

(async () => {
  let result;

  // Init logger
  log.init({ level: 'debug' });

  result = await getConfigInJSON();
  log.debug(`result: ${JSON.stringify(result)}`);
  result = await getConfigInYAML();
  log.debug(`result: ${JSON.stringify(result)}`);

  result = await getCachedConfig();
  log.debug(`result: ${JSON.stringify(result)}`);
  result = await getCachedConfigWithRefresh();
  log.debug(`result: ${JSON.stringify(result)}`);
  result = await getCachedConfig();
  log.debug(`result: ${JSON.stringify(result)}`);
})();
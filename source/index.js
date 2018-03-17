const { objectToDatasource, registerDatasource, stringToDatasource } = require("./DatasourceAdapter.js");
const TextDatasource = require("./TextDatasource.js");

/**
 * The primary module
 * @module ButtercupDatasources
 */
const module = {
    TextDatasource,
    objectToDatasource,
    registerDatasource,
    stringToDatasource
};

module.exports = module;

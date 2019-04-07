const webdav = require("webdav");
const {
    objectToDatasource,
    registerDatasource,
    registerDatasourcePostProcessor,
    stringToDatasource
} = require("./DatasourceAdapter.js");
const AuthManager = require("./AuthManager.js");
const TextDatasource = require("./TextDatasource.js");
const WebDAVDatasource = require("./WebDAVDatasource.js");
const OwnCloudDatasource = require("./OwnCloudDatasource.js");
const NextcloudDatasource = require("./NextcloudDatasource.js");
const DropboxDatasource = require("./DropboxDatasource.js");
const GoogleDriveDatasource = require("./GoogleDriveDatasource.js");
const BoxDatasource = require("./BoxDatasource.js");
const FileDatasource = require("./FileDatasource.js");

/**
 * The primary module
 * @module ButtercupDatasources
 */
const output = {
    AuthManager,
    BoxDatasource,
    DropboxDatasource,
    FileDatasource,
    GoogleDriveDatasource,
    NextcloudDatasource,
    OwnCloudDatasource,
    TextDatasource,
    WebDAVDatasource,
    objectToDatasource,
    registerDatasource,
    registerDatasourcePostProcessor,
    stringToDatasource,
    webdav
};

module.exports = output;

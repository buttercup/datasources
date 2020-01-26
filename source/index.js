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
const FileDatasource = require("./FileDatasource.js");
const {
    convertEncryptedContentToHistory,
    convertHistoryToEncryptedContent
} = require("./tools/history.js");

/**
 * The primary module
 * @module ButtercupDatasources
 */
const output = {
    AuthManager,
    DropboxDatasource,
    FileDatasource,
    GoogleDriveDatasource,
    NextcloudDatasource,
    OwnCloudDatasource,
    TextDatasource,
    WebDAVDatasource,
    convertEncryptedContentToHistory,
    convertHistoryToEncryptedContent,
    objectToDatasource,
    registerDatasource,
    registerDatasourcePostProcessor,
    stringToDatasource
};

module.exports = output;

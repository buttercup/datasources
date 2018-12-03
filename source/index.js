const webdav = require("webdav");
const { patcher: dropboxClientPatcher } = require("@buttercup/dropbox-client");
const {
    objectToDatasource,
    registerDatasource,
    stringToDatasource
} = require("./DatasourceAdapter.js");
const TextDatasource = require("./TextDatasource.js");
const WebDAVDatasource = require("./WebDAVDatasource.js");
const OwnCloudDatasource = require("./OwnCloudDatasource.js");
const NextcloudDatasource = require("./NextcloudDatasource.js");
const DropboxDatasource = require("./DropboxDatasource.js");
const BoxDatasource = require("./BoxDatasource.js");
const FileDatasource = require("./FileDatasource.js");

/**
 * The primary module
 * @module ButtercupDatasources
 */
const output = {
    BoxDatasource,
    DropboxDatasource,
    FileDatasource,
    NextcloudDatasource,
    OwnCloudDatasource,
    TextDatasource,
    WebDAVDatasource,
    dropboxClientPatcher,
    objectToDatasource,
    registerDatasource,
    stringToDatasource,
    webdav
};

module.exports = output;

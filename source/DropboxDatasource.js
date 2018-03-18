const dropboxFS = require("dropbox-fs");
const TextDatasource = require("./TextDatasource.js");
const { registerDatasource } = require("./DatasourceAdapter.js");

/**
 * Datasource for Dropbox archives
 * @augments TextDatasource
 */
class DropboxDatasource extends TextDatasource {
    /**
     * Datasource for Dropbox accounts
     * @param {String} accessToken The dropbox access token
     * @param {String} resourcePath The file path
     */
    constructor(accessToken, resourcePath) {
        super();
        this.path = resourcePath;
        this.token = accessToken;
        this.dfs = dropboxFS({
            apiKey: accessToken
        });
    }

    /**
     * Load an archive from the datasource
     * @param {Credentials} credentials The credentials for decryption
     * @returns {Promise.<Archive>} A promise that resolves with an archive
     * @memberof DropboxDatasource
     */
    load(credentials) {
        return new Promise((resolve, reject) => {
            this.dfs.readFile(this.path, { encoding: "utf8" }, function _readFile(error, data) {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            });
        }).then(content => {
            this.setContent(content);
            return super.load(credentials);
        });
    }

    /**
     * Save an archive using the datasource
     * @param {Archive} archive The archive to save
     * @param {Credentials} credentials The credentials to save with
     * @returns {Promise} A promise that resolves when saving has completed
     * @memberof DropboxDatasource
     */
    save(archive, credentials) {
        return super.save(archive, credentials).then(encryptedContent => {
            return new Promise((resolve, reject) => {
                this.dfs.writeFile(this.path, encryptedContent, function _writeFile(err) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve();
                });
            });
        });
    }

    /**
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     * @memberof DropboxDatasource
     */
    toObject() {
        return {
            type: "dropbox",
            token: this.token,
            path: this.path
        };
    }
}

/**
 * Create a new instance from an object
 * @param {Object} obj The object representation
 * @returns {DropboxDatasource} A new instance
 * @static
 * @memberof DropboxDatasource
 * @throws {Error} Throws if the type is invalid
 */
DropboxDatasource.fromObject = function fromObject(obj) {
    if (obj.type === "dropbox") {
        return new DropboxDatasource(obj.token, obj.path);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

/**
 * Create a new instance from a string
 * @param {String} str The string representation
 * @returns {DropboxDatasource} A new instance
 * @throws {Error} Throws if the type is invalid
 * @memberof DropboxDatasource
 * @static
 */
DropboxDatasource.fromString = function fromString(str) {
    return DropboxDatasource.fromObject(JSON.parse(str));
};

registerDatasource("dropbox", DropboxDatasource);

module.exports = DropboxDatasource;

const { createClient } = require("@buttercup/googledrive-client");
const VError = require("verror");
const AuthManager = require("./AuthManager.js");
const TextDatasource = require("./TextDatasource.js");
const { fireInstantiationHandlers, registerDatasource } = require("./DatasourceAdapter.js");

const DATASOURCE_TYPE = "googledrive";

/**
 * Datasource for Google Drive archives
 * @augments TextDatasource
 */
class GoogleDriveDatasource extends TextDatasource {
    /**
     * Datasource for Google Drive connections
     * @param {String} accessToken Google access token
     * @param {String} fileID The Google Drive file identifier
     */
    constructor(accessToken, fileID) {
        super();
        this.fileID = fileID;
        this.token = accessToken;
        this.client = createClient(accessToken);
        this.authManager = AuthManager.getSharedManager();
        fireInstantiationHandlers(DATASOURCE_TYPE, this);
    }

    /**
     * Load an archive from the datasource
     * @param {Credentials} credentials The credentials for decryption
     * @returns {Promise.<Array.<String>>} A promise that resolves archive history
     * @memberof GoogleDriveDatasource
     */
    load(credentials, hasAuthed = false) {
        if (this.hasContent) {
            return super.load(credentials);
        }
        return this.client
            .getFileContents(this.fileID)
            .then(content => {
                this.setContent(content);
                return super.load(credentials);
            })
            .catch(err => {
                const { authFailure = false } = VError.info(err);
                if (!authFailure) {
                    throw new VError(err, "Failed fetching Google Drive vault");
                } else if (hasAuthed) {
                    throw new VError(err, "Re-authentication failed");
                }
                return this.authManager
                    .executeAuthHandlers(DATASOURCE_TYPE, this)
                    .then(() => this.load(credentials, true))
                    .catch(err2 => {
                        throw new VError(err2, "Failed fetching Google Drive vault");
                    });
            });
    }

    /**
     * Save an archive using the datasource
     * @param {Array.<String>} history The archive history to save
     * @param {Credentials} credentials The credentials to save with
     * @returns {Promise} A promise that resolves when saving has completed
     * @memberof GoogleDriveDatasource
     */
    save(history, credentials, hasAuthed = false) {
        return super
            .save(history, credentials)
            .then(encryptedContent =>
                this.client.putFileContents({
                    id: this.fileID,
                    contents: encryptedContent
                })
            )
            .catch(err => {
                const { authFailure = false } = VError.info(err);
                if (!authFailure) {
                    throw new VError(err, "Failed saving Google Drive vault");
                } else if (hasAuthed) {
                    throw new VError(err, "Re-authentication failed");
                }
                return this.authManager
                    .executeAuthHandlers(DATASOURCE_TYPE, this)
                    .then(() => this.save(history, credentials, true))
                    .catch(err2 => {
                        throw new VError(err2, "Failed saving Google Drive vault");
                    });
            });
    }

    /**
     * Whether or not the datasource supports bypassing remote fetch operations
     * @returns {Boolean} True if content can be set to bypass fetch operations,
     *  false otherwise
     * @memberof GoogleDriveDatasource
     */
    supportsRemoteBypass() {
        return true;
    }

    /**
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     * @memberof GoogleDriveDatasource
     */
    toObject() {
        return {
            type: DATASOURCE_TYPE,
            token: this.token,
            fileID: this.fileID
        };
    }
}

/**
 * Create a new instance from an object
 * @param {Object} obj The object representation
 * @returns {GoogleDriveDatasource} A new instance
 * @static
 * @memberof GoogleDriveDatasource
 * @throws {Error} Throws if the type is invalid
 */
GoogleDriveDatasource.fromObject = function fromObject(obj) {
    if (obj.type === DATASOURCE_TYPE) {
        return new GoogleDriveDatasource(obj.token, obj.fileID);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

/**
 * Create a new instance from a string
 * @param {String} str The string representation
 * @returns {GoogleDriveDatasource} A new instance
 * @throws {Error} Throws if the type is invalid
 * @memberof GoogleDriveDatasource
 * @static
 */
GoogleDriveDatasource.fromString = function fromString(str) {
    return GoogleDriveDatasource.fromObject(JSON.parse(str));
};

registerDatasource(DATASOURCE_TYPE, GoogleDriveDatasource);

module.exports = GoogleDriveDatasource;

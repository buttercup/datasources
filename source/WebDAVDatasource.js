const path = require("path-posix");
const VError = require("verror");
const TextDatasource = require("./TextDatasource.js");
const {
    decryptAttachment,
    encryptAttachment,
    getAttachmentPath,
    getButtercupPath,
    getVaultAttachmentsPath
} = require("./tools/attachments.js");
const { fireInstantiationHandlers, registerDatasource } = require("./DatasourceAdapter.js");
const { getWebDAVFactory } = require("./tools/appEnv.js");

/**
 * WebDAV datasource for reading and writing remote archives
 * @augments TextDatasource
 */
class WebDAVDatasource extends TextDatasource {
    /**
     * Constructor for the datasource
     * @param {string} endpoint URL for the WebDAV service (without resource path)
     * @param {string} webDAVPath Resource path on the WebDAV service
     * @param {Credentials=} credentials Credentials (username/password) for the WebDAV service
     */
    constructor(endpoint, webDAVPath, credentials) {
        super();
        this._endpoint = endpoint;
        this._path = webDAVPath;
        const createClient = getWebDAVFactory();
        this._client = credentials
            ? createClient(endpoint, {
                  username: credentials.username,
                  password: credentials.password
              })
            : createClient(endpoint);
        fireInstantiationHandlers("webdav", this);
    }

    /**
     * Buttercup directory path
     * @type {String}
     * @readonly
     * @memberof WebDAVDatasource
     */
    get buttercupDirectory() {
        return getButtercupPath(path.dirname(this.path));
    }

    /**
     * The WebDAV client instance
     * @type {Object}
     * @readonly
     * @memberof WebDAVDatasource
     */
    get client() {
        return this._client;
    }

    /**
     * The remote WebDAV endpoint
     * @type {String}
     * @readonly
     * @memberof WebDAVDatasource
     */
    get endpoint() {
        return this._endpoint;
    }

    /**
     * The remote archive path
     * @type {String}
     * @readonly
     * @memberof WebDAVDatasource
     */
    get path() {
        return this._path;
    }

    /**
     * Ensure attachment paths exist
     * @param {String} vaultID The vault ID
     * @returns {Promise}
     * @memberof WebDAVDatasource
     * @protected
     */
    _ensureAttachmentsPaths(vaultID) {
        const vaultDir = getVaultAttachmentsPath(this.buttercupDirectory, vaultID);
        return this.client
            .exists(this.buttercupDirectory)
            .then(doesExist =>
                doesExist
                    ? true
                    : this.client.createDirectory(this.buttercupDirectory).then(() => false)
            )
            .then(didExist => (didExist ? this.client.exists(vaultDir) : false))
            .then(didExist => (didExist ? null : this.client.createDirectory(vaultDir)));
    }

    /**
     * Get attachment buffer
     * - Downloads the attachment contents into a buffer
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @param {Credentials=} credentials Credentials to decrypt
     *  the buffer, defaults to null (no decryption)
     * @returns {Promise.<Buffer|ArrayBuffer>}
     * @memberof WebDAVDatasource
     */
    getAttachment(vaultID, attachmentID, credentials = null) {
        const attachmentPath = getAttachmentPath(this.buttercupDirectory, vaultID, attachmentID);
        return this.client
            .getFileContents(attachmentPath)
            .then(encBuffer => {
                if (!credentials) {
                    return encBuffer;
                }
                return decryptAttachment(encBuffer, credentials);
            })
            .catch(err => {
                throw new VError(err, "Failed fetching attachment");
            });
    }

    /**
     * Get attachment details
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @returns {AttachmentDetails} The attactment details
     * @memberof WebDAVDatasource
     */
    getAttachmentDetails(vaultID, attachmentID) {
        const attachmentPath = getAttachmentPath(this.buttercupDirectory, vaultID, attachmentID);
        const attachmentFilename = path.basename(attachmentPath);
        return this.client
            .stat(attachmentPath)
            .then(details => ({
                id: attachmentID,
                vaultID,
                name: attachmentFilename,
                filename: attachmentPath,
                size: details.size,
                mime: details.mime || null
            }))
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    throw new Error("Failed fetching attachment details: Attachment not found");
                }
                throw err;
            });
    }

    /**
     * Load archive history from the datasource
     * @param {Credentials} credentials The credentials for archive decryption
     * @returns {Promise.<Array.<String>>} A promise resolving archive history
     * @memberof WebDAVDatasource
     */
    load(credentials) {
        return this.hasContent
            ? super.load(credentials)
            : this.client.getFileContents(this.path, { format: "text" }).then(content => {
                  this.setContent(content);
                  return super.load(credentials);
              });
    }

    /**
     * Put attachment data
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @param {Buffer|ArrayBuffer} buffer The attachment data
     * @param {Credentials=} credentials Credentials for
     *  encrypting the buffer. If not provided, the buffer
     *  is presumed to be in encrypted-form and will be
     *  written as-is.
     * @returns {Promise}
     * @memberof WebDAVDatasource
     */
    putAttachment(vaultID, attachmentID, buffer, credentials = null) {
        const attachmentPath = getAttachmentPath(this.buttercupDirectory, vaultID, attachmentID);
        return this._ensureAttachmentsPaths(vaultID)
            .then(() => (credentials ? encryptAttachment(buffer, credentials) : buffer))
            .then(data => this.client.putFileContents(attachmentPath, data));
    }

    /**
     * Save archive contents to the WebDAV service
     * @param {Array.<String>} history Archive history
     * @param {Credentials} credentials The credentials for encryption
     * @returns {Promise} A promise resolving when the save is complete
     * @memberof WebDAVDatasource
     */
    save(history, credentials) {
        return super
            .save(history, credentials)
            .then(encrypted => this.client.putFileContents(this.path, encrypted));
    }

    /**
     * Check if the datasource supports attachments
     * @returns {Boolean}
     * @memberof WebDAVDatasource
     */
    supportsAttachments() {
        return true;
    }

    /**
     * Whether or not the datasource supports bypassing remote fetch operations
     * @returns {Boolean} True if content can be set to bypass fetch operations,
     *  false otherwise
     * @memberof WebDAVDatasource
     */
    supportsRemoteBypass() {
        return true;
    }

    /**
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     * @memberof WebDAVDatasource
     */
    toObject() {
        return {
            type: "webdav",
            endpoint: this.endpoint,
            path: this.path
        };
    }
}

/**
 * Create an instance from an object
 * @param {Object} obj The WebDAV info object
 * @param {Credentials=} hostCredentials The server credentials
 * @static
 * @memberof WebDAVDatasource
 */
WebDAVDatasource.fromObject = function fromObject(obj, hostCredentials) {
    if (obj.type === "webdav") {
        return new WebDAVDatasource(obj.endpoint, obj.path, hostCredentials);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

/**
 * Create an instance from a string
 * @param {String} str The string representation of the datasource
 * @param {Credentials=} hostCredentials The server credentials
 * @static
 * @memberof WebDAVDatasource
 */
WebDAVDatasource.fromString = function fromString(str, hostCredentials) {
    return WebDAVDatasource.fromObject(JSON.parse(str), hostCredentials);
};

registerDatasource("webdav", WebDAVDatasource);

module.exports = WebDAVDatasource;

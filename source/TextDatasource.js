const EventEmitter = require("events");
const hash = require("hash.js");
const {
    convertEncryptedContentToHistory,
    convertHistoryToEncryptedContent
} = require("./tools/history.js");
const { fireInstantiationHandlers, registerDatasource } = require("./DatasourceAdapter.js");

/**
 * @typedef {Object} AttachmentDetails
 * @property {String} id The attachment ID
 * @property {String} vaultID The vault ID
 * @property {String} name Base filename
 * @property {String} filename Full filename and path
 * @property {Number} size Size in bytes (0 if invalid)
 * @property {String|null} mime MIME type if available
 */

/**
 * Datasource for text input and output
 */
class TextDatasource extends EventEmitter {
    /**
     * Constructor for the text datasource
     * @param {string} content The content to load from
     */
    constructor(content) {
        super();
        this._content = content || "";
        fireInstantiationHandlers("text", this);
    }

    /**
     * Whether the datasource currently has content
     * Used to check if the datasource has encrypted content that can be loaded. May be used
     * when attempting to open a vault in offline mode.
     * @type {Boolean}
     * @memberof TextDatasource
     */
    get hasContent() {
        return this._content && this._content.length > 0;
    }

    /**
     * Get attachment buffer
     * - Downloads the attachment contents into a buffer
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @param {Credentials=} credentials Credentials to decrypt
     *  the buffer, defaults to null (no decryption)
     * @returns {Promise.<Buffer|ArrayBuffer>}
     * @memberof TextDatasource
     */
    getAttachment(vaultID, attachmentID, credentials = null) {
        return Promise.reject(new Error("Attachments not supported"));
    }

    /**
     * Get attachment details
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @returns {AttachmentDetails} The attactment details
     * @memberof TextDatasource
     */
    getAttachmentDetails(vaultID, attachmentID) {
        return Promise.reject(new Error("Attachments not supported"));
    }

    /**
     * Get the ID of the datasource
     * ID to uniquely identify the datasource and its parameters
     * @returns {String} A hasn of the datasource (unique ID)
     * @memberof TextDatasource
     */
    getID() {
        const type = this.toObject().type;
        const content = type === "text" ? this._content : this.toString();
        if (!content) {
            throw new Error("Failed getting ID: Datasource requires content for ID generation");
        }
        return hash
            .sha256()
            .update(content)
            .digest("hex");
    }

    /**
     * Load from the stored content using a password to decrypt
     * @param {Credentials} credentials The password or Credentials instance to decrypt with
     * @returns {Promise.<Array.<String>>} A promise that resolves with decrypted history
     * @throws {Error} Rejects if content is empty
     * @memberof TextDatasource
     */
    load(credentials) {
        if (!this._content) {
            return Promise.reject(new Error("Failed to load archive: Content is empty"));
        }
        return convertEncryptedContentToHistory(this._content, credentials);
    }

    /**
     * Save archive contents with a password
     * @param {Array.<String>} history Archive history to save
     * @param {Credentials} credentials The Credentials instance to encrypt with
     * @returns {Promise.<string>} A promise resolving with the encrypted content
     * @memberof TextDatasource
     */
    save(history, credentials) {
        return convertHistoryToEncryptedContent(history, credentials);
    }

    /**
     * Set the text content
     * @param {String} content The encrypted text content
     * @returns {TextDatasource} Self
     * @memberof TextDatasource
     */
    setContent(content) {
        this._content = content || "";
        return this;
    }

    /**
     * Whether or not the datasource supports attachments
     * @returns {Boolean}
     * @memberof TextDatasource
     */
    supportsAttachments() {
        return false;
    }

    /**
     * Whether or not the datasource supports bypassing remote fetch operations
     * @returns {Boolean} True if content can be set to bypass fetch operations,
     *  false otherwise
     * @memberof TextDatasource
     */
    supportsRemoteBypass() {
        return false;
    }

    /**
     * Output the datasource as an object
     * @returns {Object} The object representation
     * @memberof TextDatasource
     */
    toObject() {
        return {
            type: "text",
            content: this._content
        };
    }

    /**
     * Output the datasource configuration as a string
     * @returns {String} The string representation of the datasource
     * @memberof TextDatasource
     */
    toString() {
        return JSON.stringify(this.toObject());
    }
}

TextDatasource.fromObject = function fromObject(obj) {
    if (obj.type === "text") {
        return new TextDatasource(obj.content);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

TextDatasource.fromString = function fromString(str) {
    return TextDatasource.fromObject(JSON.parse(str));
};

registerDatasource("text", TextDatasource);

module.exports = TextDatasource;

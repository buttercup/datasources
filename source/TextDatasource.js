const { createSession } = require("iocane");
const { hasValidSignature, sign, stripSignature } = require("@buttercup/signing");
const { compress, decompress } = require("./tools/compression.js");
const historyTools = require("./tools/history.js");
const { registerDatasource } = require("./DatasourceAdapter.js");

/**
 * Convert encrypted text to an array of commands (history)
 * @param {String} encText The encrypted archive content
 * @param {Credentials} credentials A credentials instance that has a password, keyfile
 *  or both
 * @returns {Promise.<Array>} A promise that resolves with an array of commands
 * @private
 */
function convertEncryptedContentToHistory(encText, credentials) {
    let password;
    return Promise.resolve()
        .then(() => {
            password = processCredentials(credentials);
            if (!hasValidSignature(encText)) {
                throw new Error("No valid signature in archive");
            }
            return stripSignature(encText);
        })
        .then(encryptedData => createSession().decrypt(encryptedData, password))
        .then(decrypted => {
            if (decrypted && decrypted.length > 0) {
                const decompressed = decompress(decrypted);
                if (decompressed) {
                    return historyTools.historyStringToArray(decompressed);
                }
            }
            throw new Error("Failed reconstructing history: Decryption failed");
        });
}

/**
 * Convert an array of commands (history) to an encrypted string
 * @param {Array.<String>} historyArr An array of commands
 * @param {Credentials} credentials A credentials instance that has a password, keyfile
 *  or both
 * @returns {String} Encrypted archive contents
 * @private
 */
function convertHistoryToEncryptedContent(historyArr, credentials) {
    let password;
    return Promise.resolve()
        .then(() => {
            password = processCredentials(credentials);
            return historyTools.historyArrayToString(historyArr);
        })
        .then(history => compress(history))
        .then(compressed => createSession().encrypt(compressed, password))
        .then(sign);
}

/**
 * Pre-process credentials data
 * @param {Credentials} credentials Password or Credentials instance
 * @returns {{ password: (String|undefined), keyfile: (String|undefined) }} Credential data
 * @throws {Error} Throws if both password and keyfile are undefined
 * @throws {Error} Throws if credentials is not an object
 * @private
 */
function processCredentials(credentials) {
    if (typeof credentials !== "object" || credentials === null) {
        throw new Error("Failed configuring datasource: Invalid credentials instance");
    }
    const password = credentials.password;
    if (!password) {
        throw new Error("Failed configuring datasource: No password available");
    }
    return password;
}

/**
 * Datasource for text input and output
 */
class TextDatasource {
    /**
     * Constructor for the text datasource
     * @param {string} content The content to load from
     */
    constructor(content) {
        this._content = content || "";
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

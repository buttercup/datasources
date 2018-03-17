const iocane = require("iocane").crypto;
const { hasValidSignature, sign, stripSignature } = require("@buttercup/signing");
const { Archive } = require("buttercup");
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
    const { password, keyfile } = processCredentials(credentials);
    return Promise.resolve(encText)
        .then(function __stripSignature(data) {
            if (!hasValidSignature(data)) {
                throw new Error("No valid signature in archive");
            }
            return stripSignature(data);
        })
        .then(function __decryptUsingKeyFile(encryptedData) {
            // optionally decrypt using a key file
            return keyfile ? iocane.decryptWithKeyFile(encryptedData, keyfile) : encryptedData;
        })
        .then(function __decryptUsingPassword(encryptedData) {
            // optionally decrypt using a password
            return password ? iocane.decryptWithPassword(encryptedData, password) : encryptedData;
        })
        .then(function __marshallHistoryToArray(decrypted) {
            if (decrypted && decrypted.length > 0) {
                const decompressed = decompress(decrypted);
                if (decompressed) {
                    return historyTools.historyStringToArray(decompressed);
                }
            }
            throw new Error("Decryption failed");
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
    const { password, keyfile } = processCredentials(credentials);
    const history = historyTools.historyArrayToString(historyArr);
    const compressed = compress(history);
    return Promise.resolve(compressed)
        .then(function __encryptUsingPassword(encryptedData) {
            return password ? iocane.encryptWithPassword(encryptedData, password) : encryptedData;
        })
        .then(function __encryptUsingKeyFile(encryptedData) {
            return keyfile ? iocane.encryptWithKeyFile(encryptedData, keyfile) : encryptedData;
        })
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
    if (typeof credentials !== "object") {
        throw new Error("Expected credentials object, got " + typeof credentials);
    }
    // either might be undefined, but at least one needs to be defined
    let password = credentials.password,
        keyfile = credentials.getValue("keyfile");
    if (!password && !keyfile) {
        throw new Error("Neither a password nor key-file were provided");
    }
    return {
        password,
        keyfile
    };
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
     * @param {Boolean=} emptyCreatesNew Create a new Archive instance if text contents are empty (defaults to false)
     * @returns {Promise.<Archive>} A promise that resolves with an open archive
     */
    load(credentials, emptyCreatesNew) {
        emptyCreatesNew = emptyCreatesNew === undefined ? false : emptyCreatesNew;
        if (this._content.trim().length <= 0) {
            return emptyCreatesNew
                ? new Archive()
                : Promise.reject(new Error("Unable to load archive: contents empty"));
        }
        return convertEncryptedContentToHistory(this._content, credentials).then(history =>
            Archive.createFromHistory(history)
        );
    }

    /**
     * Save an archive with a password
     * @param {Archive} archive The archive to save
     * @param {Credentials} credentials The Credentials instance to encrypt with
     * @returns {Promise.<string>} A promise resolving with the encrypted content
     */
    save(archive, credentials) {
        return convertHistoryToEncryptedContent(archive._getWestley().getHistory(), credentials);
    }

    /**
     * Set the text content
     * @param {String} content The encrypted text content
     * @returns {TextDatasource} Self
     */
    setContent(content) {
        this._content = content || "";
        return this;
    }

    /**
     * Output the datasource as an object
     * @returns {Object} The object representation
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

const WebDAVDatasource = require("./WebDAVDatasource.js");
const { registerDatasource } = require("./DatasourceAdapter.js");

const BOX_URL = "https://dav.box.com/dav/";

/**
 * Datasource for Box archives
 * @augments WebDAVDatasource
 */
class BoxDatasource extends WebDAVDatasource {
    /**
     * Datasource for Box connections
     * @param {String} resourcePath The file path
     * @param {Credentials} credentials The credentials (username/password) for Box
     */
    constructor(resourcePath, credentials) {
        super(BOX_URL, resourcePath, credentials);
    }

    /**
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     * @memberof BoxDatasource
     */
    toObject() {
        return {
            type: "box",
            path: this.path
        };
    }
}

/**
 * Create an instance from an object
 * @param {Object} obj The object representation
 * @param {Credentials} hostCredentials The box account credentials
 * @returns {BoxDatasource} A new instance
 * @static
 * @memberof BoxDatasource
 * @throws {Error} Throws if credentials are not provided
 * @throws {Error} Throws if the type specified is invalid
 */
BoxDatasource.fromObject = function fromObject(obj, hostCredentials) {
    if (!hostCredentials) {
        throw new Error("Credentials required for BoxDatasource instantiation");
    }
    if (obj.type === "box") {
        return new BoxDatasource(obj.path, hostCredentials);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

/**
 * Create an instance from a string
 * @param {String} str The string representation
 * @param {Credentials} hostCredentials Credentials for the box account
 * @static
 * @memberof BoxDatasource
 * @returns {BoxDatasource} A new instance
 * @see BoxDatasource.fromObject
 */
BoxDatasource.fromString = function fromString(str, hostCredentials) {
    return BoxDatasource.fromObject(JSON.parse(str), hostCredentials);
};

registerDatasource("box", BoxDatasource);

module.exports = BoxDatasource;

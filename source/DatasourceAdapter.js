const __datasources = {};

/**
 * Create a datasource from an object
 * The object must have the required properties (as output by the corresponding
 * `toObject` call of the datasource).
 * @param {Object} obj The object
 * @param {Credentials=} hostCredentials Credentials instance for remote host
 *  authentication (not required for File/Text datasources)
 * @returns {null|TextDatasource} A datasource instance or null of none found
 */
function objectToDatasource(obj, hostCredentials) {
    const { type } = obj;
    if (!type) {
        throw new Error("No type specified");
    }
    const DSClass = __datasources[type];
    if (DSClass && DSClass.fromObject) {
        return DSClass.fromObject(obj, hostCredentials);
    }
    return null;
}

/**
 * Register a new datasource
 * This is called internally by the built-in datasources, but should be called if a
 * custom datasource is used.
 * @param {String} datasourceType The name (slug) of the datasource
 * @param {Object} DSClass The class for the new datasource
 */
function registerDatasource(datasourceType, DSClass) {
    __datasources[datasourceType] = DSClass;
}

/**
 * Create a datasource from a string
 * @see objectToDatasource
 * @param {String} str The string representation of a datasource, as output by
 *  the `toString` method on the corresponding datasource
 * @param {Credentials=} hostCredentials The remote authentication credentials
 * @returns {null|TextDatasource} A new datasource instance or null of not found
 */
function stringToDatasource(str, hostCredentials) {
    return objectToDatasource(JSON.parse(str), hostCredentials);
}

module.exports = {
    objectToDatasource,
    registerDatasource,
    stringToDatasource
};

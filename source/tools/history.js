/**
 * Convert array of history lines to a string
 * @param {Array.<String>} historyArray An array of history items
 * @returns {String} The string representation
 * @private
 */
function historyArrayToString(historyArray) {
    return historyArray.join("\n");
}

/**
 * Convert a history string to an array
 * @param {String} historyString The history string
 * @returns {Array.<String>} An array of history items
 * @private
 */
function historyStringToArray(historyString) {
    return historyString.split("\n");
}

module.exports = {
    historyArrayToString,
    historyStringToArray
};

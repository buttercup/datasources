const { forEachAsync } = require("foreachasync");
const globals = require("global");

function markGlobalPresence() {
    if (typeof globals._bcupAuthMgr !== "undefined") {
        console.warn(
            "Detected multiple Buttercup authentication managers for datasources: Multiple copies of the same library may have been bundled together"
        );
    }
    globals._bcupAuthMgr = true;
}

let __sharedManager;

class AuthManager {
    constructor() {
        this._handlers = {};
    }

    executeAuthHandlers(datasourceType, datasourceInst) {
        const handlers = this._handlers[datasourceType];
        if (!Array.isArray(handlers)) {
            return Promise.reject(
                new Error(
                    `Failed executing auth handlers: No handlers registered for datasource type: ${datasourceType}`
                )
            );
        }
        return Promise.resolve().then(() =>
            forEachAsync(handlers, handler => handler(datasourceInst))
        );
    }

    registerHandler(datasourceType, handler) {
        if (typeof handler !== "function") {
            throw new Error("Failed registering handler: Argument was not a function");
        }
        this._handlers[datasourceType] = this._handlers[datasourceType] || [];
        this._handlers[datasourceType].push(handler);
    }
}

AuthManager.getSharedManager = function getSharedManager() {
    if (!__sharedManager) {
        __sharedManager = new AuthManager();
        markGlobalPresence();
    }
    return __sharedManager;
};

module.exports = AuthManager;

const { getSharedAppEnv } = require("@buttercup/app-env");

function getCompressFn() {
    return getSharedAppEnv().getProperty("compression/v1/compressText");
}

function getDecompressFn() {
    return getSharedAppEnv().getProperty("compression/v1/decompressText");
}

function getDecryptDataFn() {
    return getSharedAppEnv().getProperty("crypto/v1/decryptBuffer");
}

function getEncryptDataFn() {
    return getSharedAppEnv().getProperty("crypto/v1/encryptBuffer");
}

function getDecryptTextFn() {
    return getSharedAppEnv().getProperty("crypto/v1/decryptText");
}

function getEncryptTextFn() {
    return getSharedAppEnv().getProperty("crypto/v1/encryptText");
}

function getWebDAVFactory() {
    return getSharedAppEnv().getProperty("net/webdav/v1/newClient");
}

module.exports = {
    getCompressFn,
    getDecompressFn,
    getDecryptDataFn,
    getEncryptDataFn,
    getDecryptTextFn,
    getEncryptTextFn,
    getWebDAVFactory
};

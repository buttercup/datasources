const { getSharedAppEnv } = require("@buttercup/app-env");

function getCompressFn() {
    return getSharedAppEnv().getProperty("compression/v1/compressText");
}

function getDecompressFn() {
    return getSharedAppEnv().getProperty("compression/v1/decompressText");
}

function getDecryptFn() {
    return getSharedAppEnv().getProperty("crypto/v1/decryptText");
}

function getEncryptFn() {
    return getSharedAppEnv().getProperty("crypto/v1/encryptText");
}

module.exports = {
    getCompressFn,
    getDecompressFn,
    getDecryptFn,
    getEncryptFn
};

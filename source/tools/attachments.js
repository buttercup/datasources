const path = require("path-posix");
const { getDecryptDataFn, getEncryptDataFn } = require("./appEnv.js");

function decryptAttachment(buff, credentials) {
    const decrypt = getDecryptDataFn();
    return decrypt(buff, credentials.password);
}

function getAttachmentPath(buttercupDir, vaultID, attachmentID) {
    return path.join(buttercupDir, vaultID, attachmentID);
}

function getButtercupPath(vaultDir) {
    return path.join(vaultDir, ".buttercup");
}

function getVaultAttachmentsPath(buttercupDir, vaultID) {
    return path.join(buttercupDir, vaultID);
}

module.exports = {
    decryptAttachment,
    getAttachmentPath,
    getButtercupPath,
    getVaultAttachmentsPath
};

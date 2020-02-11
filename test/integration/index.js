const path = require("path");
const createServer = require("webdav/test/server/index.js");
const expect = require("chai").expect;
const sinon = require("sinon");
const rimraf = require("rimraf").sync;
const copyDir = require("copy-dir").sync;
require("@buttercup/app-env/native");
const { getSharedAppEnv } = require("@buttercup/app-env");

function createWebDAVServer() {
    return createServer(path.resolve(__dirname, "../testContents"));
}

function clean() {
    rimraf(path.resolve(__dirname, "../testContents"));
    copyDir(
        path.resolve(__dirname, "../serverContents"),
        path.resolve(__dirname, "../testContents")
    );
}

function setup() {
    clean();
    this.server = createWebDAVServer();
    this.server.start();
    return createServer.test;
}

function tearDown() {
    this.server.stop();
}

Object.assign(global, {
    expect: expect,
    setup: setup,
    sinon: sinon,
    tearDown: tearDown
});

getSharedAppEnv().getProperty("crypto/v1/setDerivationRounds")(10);

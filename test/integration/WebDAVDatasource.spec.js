const path = require("path");
const fs = require("fs");
const { Archive, Credentials, Group } = require("buttercup");
const fileExists = require("file-exists");
const uuid = require("uuid/v4");
const WebDAVDatasource = require("../../source/WebDAVDatasource.js");

describe("WebDAVDatasource", function() {
    beforeEach(function() {
        const { username, password, port } = setup.call(this);
        this.existingDatasource = new WebDAVDatasource(
            `http://localhost:${port}/webdav/server`,
            "/existing.bcup",
            {
                username,
                password
            }
        );
        this.newDatasource = new WebDAVDatasource(
            `http://localhost:${port}/webdav/server`,
            "/subdir/new.bcup",
            {
                username,
                password
            }
        );
    });

    afterEach(function() {
        tearDown.call(this);
    });

    describe("load", function() {
        it("reads an existing file", function() {
            return this.existingDatasource
                .load(Credentials.fromPassword("test"))
                .then(hist => Archive.createFromHistory(hist))
                .then(newArchive => {
                    expect(newArchive.findGroupsByTitle("General")[0]).to.be.an.instanceOf(Group);
                });
        });
    });

    describe("putAttachment", function() {
        it("writes the attachment", function() {
            const vaultID = uuid();
            const attachmentID = uuid();
            const source = fs.readFileSync(path.resolve(__dirname, "../serverContents/logs.jpg"));
            return this.existingDatasource
                .putAttachment(vaultID, attachmentID, source, Credentials.fromPassword("test"))
                .then(() =>
                    fileExists(
                        path.resolve(
                            __dirname,
                            `../testContents/.buttercup/${vaultID}/${attachmentID}.bcatt`
                        )
                    )
                )
                .then(exists => {
                    expect(exists).to.be.true;
                });
        });
    });

    describe("save", function() {
        it("writes a file that can be loaded again", function() {
            const archive = Archive.createWithDefaults();
            return this.newDatasource
                .save(archive.getHistory(), Credentials.fromPassword("test"))
                .then(() => this.newDatasource.load(Credentials.fromPassword("test")))
                .then(hist => Archive.createFromHistory(hist))
                .then(newArchive => {
                    expect(newArchive.id).to.equal(archive.id);
                });
        });
    });
});

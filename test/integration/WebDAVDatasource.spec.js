const { Archive, Credentials, Group } = require("buttercup");
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

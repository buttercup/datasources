const { Archive, createCredentials } = require("buttercup");
const TextDatasource = require("../source/TextDatasource.js");

describe("TextDatasource", function() {
    it("can be instantiated without error", function() {
        expect(() => {
            new TextDatasource();
        }).to.not.throw();
    });

    describe("load", function() {
        beforeEach(function() {
            this.archive = new Archive();
            this.archive.createGroup("test");
            const testDatasource = new TextDatasource();
            return testDatasource
                .save(
                    this.archive._getWestley().getHistory(),
                    createCredentials.fromPassword("test")
                )
                .then(encryptedContents => {
                    this.datasource = new TextDatasource(encryptedContents);
                });
        });

        it("loads the archive correctly", function() {
            return this.datasource
                .load(createCredentials.fromPassword("test"))
                .then(history => Archive.createFromHistory(history))
                .then(archive => {
                    expect(archive.findGroupsByTitle("test")).to.have.lengthOf(1);
                });
        });

        it("rejects if the password is incorrect", function() {
            return expect(
                this.datasource.load(createCredentials.fromPassword("wrong"))
            ).to.be.rejectedWith(/Authentication failed/i);
        });
    });

    describe("save", function() {
        beforeEach(function() {
            this.archive = new Archive();
            this.archive.createGroup("test");
            this.datasource = new TextDatasource();
        });

        it("saves and encrypts the archive", function() {
            return this.datasource
                .save(
                    this.archive._getWestley().getHistory(),
                    createCredentials.fromPassword("test")
                )
                .then(encrypted => {
                    expect(encrypted).to.be.a("string");
                    expect(encrypted).to.not.contain("test");
                });
        });

        it("saves to a loadable format", function() {
            return this.datasource
                .save(
                    this.archive._getWestley().getHistory(),
                    createCredentials.fromPassword("test")
                )
                .then(enc => {
                    const tds = new TextDatasource(enc);
                    return tds.load(createCredentials.fromPassword("test"));
                })
                .then(history => Archive.createFromHistory(history))
                .then(archive => {
                    expect(archive).to.be.an.instanceof(Archive);
                    expect(archive.findGroupsByTitle("test")).to.have.lengthOf(1);
                });
        });
    });
});

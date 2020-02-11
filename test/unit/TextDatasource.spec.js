const { Archive, Credentials } = require("buttercup");
const TextDatasource = require("../../source/TextDatasource.js");

describe("TextDatasource", function() {
    it("can be instantiated without error", function() {
        expect(() => {
            new TextDatasource();
        }).to.not.throw();
    });

    describe("getID", function() {
        it("returns a hash", function() {
            const tds = new TextDatasource("fake-content");
            expect(tds.getID()).to.equal(
                "9c87681ea7ba17d350f3cb62894935d8f77c0aacc678966d51638d584a6eaee0"
            );
        });

        it("throws if no content", function() {
            const tds = new TextDatasource();
            expect(() => {
                tds.getID();
            }).to.throw(/Datasource requires content/i);
        });
    });

    describe("load", function() {
        beforeEach(function() {
            this.archive = new Archive();
            this.archive.createGroup("test");
            const testDatasource = new TextDatasource();
            return testDatasource
                .save(this.archive._getWestley().history, Credentials.fromPassword("test"))
                .then(encryptedContents => {
                    this.datasource = new TextDatasource(encryptedContents);
                });
        });

        it("loads the archive correctly", function() {
            return this.datasource
                .load(Credentials.fromPassword("test"))
                .then(history => Archive.createFromHistory(history))
                .then(archive => {
                    expect(archive.findGroupsByTitle("test")).to.have.lengthOf(1);
                });
        });

        it("rejects if the password is incorrect", function() {
            return expect(
                this.datasource.load(Credentials.fromPassword("wrong"))
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
                .save(this.archive._getWestley().history, Credentials.fromPassword("test"))
                .then(encrypted => {
                    expect(encrypted).to.be.a("string");
                    expect(encrypted).to.not.contain("test");
                });
        });

        it("saves to a loadable format", function() {
            return this.datasource
                .save(this.archive._getWestley().history, Credentials.fromPassword("test"))
                .then(enc => {
                    const tds = new TextDatasource(enc);
                    return tds.load(Credentials.fromPassword("test"));
                })
                .then(history => Archive.createFromHistory(history))
                .then(archive => {
                    expect(archive).to.be.an.instanceof(Archive);
                    expect(archive.findGroupsByTitle("test")).to.have.lengthOf(1);
                });
        });
    });
});

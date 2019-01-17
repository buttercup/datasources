const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf").sync;
const fileExists = require("file-exists");
const { Archive, Credentials } = require("buttercup");
const FileDatasource = require("../source/FileDatasource.js");
const TextDatasource = require("../source/TextDatasource.js");

describe("FileDatasource", function() {
    it("instantiates without error", function() {
        expect(() => {
            new FileDatasource("./test.bcup");
        }).to.not.throw();
    });

    describe("getID", function() {
        it("returns a repeatable hash", function() {
            const tds = new FileDatasource("./test.bcup");
            expect(tds.getID()).to.equal(
                "3058effd1139d486054ea89e47b3049b8503e30ba8bbb8444935d11701958b19"
            );
            const tds2 = new FileDatasource("./test.bcup");
            expect(tds2.getID()).to.equal(
                "3058effd1139d486054ea89e47b3049b8503e30ba8bbb8444935d11701958b19"
            );
        });

        it("returns a unique hash for different files", function() {
            const tds = new FileDatasource("./test2.bcup");
            expect(tds.getID()).to.equal(
                "b27aa03132bbdd838e44482313670da7739d8241bee0297ee25e174905faa699"
            );
        });
    });

    describe("load", function() {
        beforeEach(function() {
            this.archive = new Archive();
            this.archive.createGroup("testGroup");
            this.path = path.resolve(__dirname, "./test.bcup");
            this.datasource = new FileDatasource(this.path);
            const tds = new TextDatasource();
            return tds
                .save(this.archive._getWestley().getHistory(), Credentials.fromPassword("test"))
                .then(encryptedArchive => {
                    fs.writeFileSync(this.path, encryptedArchive);
                });
        });

        afterEach(function() {
            rimraf(this.path);
        });

        it("reads from a file", function() {
            return expect(this.datasource.load(Credentials.fromPassword("test"))).to.eventually.be
                .fulfilled;
        });

        it("loads an archive", function() {
            return this.datasource
                .load(Credentials.fromPassword("test"))
                .then(history => Archive.createFromHistory(history))
                .then(archive => {
                    expect(archive.findGroupsByTitle("testGroup")).to.have.lengthOf(1);
                });
        });

        it("skips loading when content provided", function() {
            const contents = fs.readFileSync(this.path, "utf8");
            sinon.spy(this.datasource, "readFile");
            this.datasource.setContent(contents);
            return this.datasource.load(Credentials.fromPassword("test")).then(history => {
                expect(history).to.be.an("array");
                expect(this.datasource.readFile.notCalled).to.be.true;
            });
        });
    });

    describe("save", function() {
        beforeEach(function() {
            this.archive = new Archive();
            this.archive.createGroup("testing");
            this.path = path.resolve(__dirname, "./test.bcup");
            this.datasource = new FileDatasource(this.path);
            rimraf(this.path);
        });

        afterEach(function() {
            rimraf(this.path);
        });

        it("writes to a file", function() {
            return this.datasource
                .save(this.archive._getWestley().getHistory(), Credentials.fromPassword("test"))
                .then(() => {
                    return expect(fileExists(this.path)).to.eventually.be.true;
                });
        });

        it("writes an archive", function() {
            return this.datasource
                .save(this.archive._getWestley().getHistory(), Credentials.fromPassword("test"))
                .then(() => {
                    const contents = fs.readFileSync(this.path, "utf8");
                    const tds = new TextDatasource(contents);
                    return tds.load(Credentials.fromPassword("test"));
                })
                .then(history => Archive.createFromHistory(history))
                .then(archive => {
                    expect(archive.findGroupsByTitle("testing")).to.have.lengthOf(1);
                });
        });
    });
});

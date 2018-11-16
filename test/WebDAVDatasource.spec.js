const { Archive, Credentials } = require("buttercup");
const rewire = require("rewire");
const TextDatasource = require("../source/TextDatasource.js");
const createMock = require("./WebDAVClientMock.js");

const WebDAVDatasource = rewire("../source/WebDAVDatasource.js");

describe("WebDAVDatasource", function() {
    beforeEach(function() {
        this.clientMock = createMock();
        WebDAVDatasource.__set__("createClient", this.clientMock);
    });

    it("can be instantiated without error", function() {
        expect(() => {
            new WebDAVDatasource("http://test.com", "/test.bcup");
        }).to.not.throw();
    });

    it("creates a WebDAV client", function() {
        const creds = new Credentials({ username: "user", password: "pass" });
        new WebDAVDatasource("http://test.com", "/test.bcup", creds);
        expect(this.clientMock.createSpy.calledOnce).to.be.true;
        const args = this.clientMock.createSpy.firstCall.args;
        expect(args).to.deep.equal(["http://test.com", { username: "user", password: "pass" }]);
    });

    describe("load", function() {
        beforeEach(function() {
            const creds = new Credentials({ username: "user", password: "pass" });
            this.datasource = new WebDAVDatasource("http://test.com", "/test.bcup", creds);
            this.archive = new Archive();
            const tds = new TextDatasource();
            return tds
                .save(this.archive._getWestley().getHistory(), Credentials.fromPassword("test"))
                .then(encrypted => {
                    this.encryptedContent = encrypted;
                    sinon
                        .stub(this.datasource.client, "getFileContents")
                        .returns(Promise.resolve(encrypted));
                });
        });

        it("loads without error", function() {
            return expect(this.datasource.load(Credentials.fromPassword("test"))).to.eventually.be
                .fulfilled;
        });

        it("retrieves content from the client", function() {
            return this.datasource.load(Credentials.fromPassword("test")).then(() => {
                expect(
                    this.datasource.client.getFileContents.calledWithExactly("/test.bcup", {
                        format: "text"
                    })
                ).to.be.true;
            });
        });

        it("skips loading when content provided", function() {
            this.datasource.setContent(this.encryptedContent);
            return this.datasource.load(Credentials.fromPassword("test")).then(history => {
                expect(history).to.be.an("array");
                expect(this.datasource.client.getFileContents.notCalled).to.be.true;
            });
        });
    });

    describe("save", function() {
        beforeEach(function() {
            const creds = new Credentials({ username: "user", password: "pass" });
            this.datasource = new WebDAVDatasource("http://test.com", "/test.bcup", creds);
            this.archive = new Archive();
            sinon.stub(this.datasource.client, "putFileContents").returns(Promise.resolve());
        });

        it("writes the archive to the remote", function() {
            return this.datasource
                .save(this.archive._getWestley().getHistory(), Credentials.fromPassword("test"))
                .then(() => {
                    const [
                        writtenPath,
                        writtenContents
                    ] = this.datasource.client.putFileContents.firstCall.args;
                    expect(writtenPath).to.equal("/test.bcup");
                    expect(writtenContents).to.be.a("string");
                    expect(writtenContents).to.have.length.above(0);
                });
        });
    });
});

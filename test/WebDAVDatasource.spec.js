const { Archive, createCredentials } = require("buttercup");
const rewire = require("rewire");
const TextDatasource = require("../source/TextDatasource.js");
const createMock = require("./WebDAVClientMock.js");

const WebDAVDatasource = rewire("../source/WebDAVDatasource.js");

describe("WebDAVDatasource", function() {
    beforeEach(function() {
        this.clientMock = createMock();
        WebDAVDatasource.__set__("createWebDAVClient", this.clientMock);
    });

    it("can be instantiated without error", function() {
        expect(() => {
            new WebDAVDatasource("http://test.com", "/test.bcup");
        }).to.not.throw();
    });

    it("creates a WebDAV client", function() {
        const creds = createCredentials({ username: "user", password: "pass" });
        new WebDAVDatasource("http://test.com", "/test.bcup", creds);
        expect(this.clientMock.createSpy.calledWithExactly("http://test.com", "user", "pass")).to.be
            .true;
    });

    describe("load", function() {
        beforeEach(function() {
            const creds = createCredentials({ username: "user", password: "pass" });
            this.datasource = new WebDAVDatasource("http://test.com", "/test.bcup", creds);
            this.archive = new Archive();
            const tds = new TextDatasource();
            return tds
                .save(
                    this.archive._getWestley().getHistory(),
                    createCredentials.fromPassword("test")
                )
                .then(encrypted => {
                    sinon
                        .stub(this.datasource.client, "getFileContents")
                        .returns(Promise.resolve(encrypted));
                });
        });

        it("loads without error", function() {
            return expect(this.datasource.load(createCredentials.fromPassword("test"))).to
                .eventually.be.fulfilled;
        });

        it("retrieves content from the client", function() {
            return this.datasource.load(createCredentials.fromPassword("test")).then(() => {
                expect(
                    this.datasource.client.getFileContents.calledWithExactly("/test.bcup", {
                        format: "text"
                    })
                ).to.be.true;
            });
        });
    });

    describe("save", function() {
        beforeEach(function() {
            const creds = createCredentials({ username: "user", password: "pass" });
            this.datasource = new WebDAVDatasource("http://test.com", "/test.bcup", creds);
            this.archive = new Archive();
            sinon.stub(this.datasource.client, "putFileContents").returns(Promise.resolve());
        });

        it("writes the archive to the remote", function() {
            return this.datasource
                .save(
                    this.archive._getWestley().getHistory(),
                    createCredentials.fromPassword("test")
                )
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

const { Archive, Credentials } = require("buttercup");
const VError = require("verror");
const GoogleDriveDatasource = require("../../source/GoogleDriveDatasource.js");
const TextDatasource = require("../../source/TextDatasource.js");

function getEncryptedContents() {
    const archive = new Archive();
    archive.createGroup("test");
    const testDatasource = new TextDatasource();
    return testDatasource
        .save(archive._getWestley().history, Credentials.fromPassword("test"))
        .then(encContents => [archive, encContents]);
}

describe("GoogleDriveDatasource", function() {
    beforeEach(function() {
        return getEncryptedContents().then(([archive, encContent]) => {
            this.encryptedContents = encContent;
            this.archive = archive;
            this.datasource = new GoogleDriveDatasource("abc", "def");
            sinon
                .stub(this.datasource.client, "getFileContents")
                .returns(Promise.resolve(encContent));
            sinon.stub(this.datasource.client, "putFileContents").returns(Promise.resolve());
        });
    });

    describe("load", function() {
        it("loads vault contents", function() {
            return this.datasource.load(Credentials.fromPassword("test")).then(contents => {
                expect(contents).to.be.an("array");
                expect(contents).to.have.length.above(0);
            });
        });

        it("makes a request with the correct file ID", function() {
            return this.datasource.load(Credentials.fromPassword("test")).then(() => {
                expect(this.datasource.client.getFileContents.calledWithExactly("abc")).to.be.true;
            });
        });

        it("handles authorisation failures", function() {
            const testError = new VError(
                {
                    info: { authFailure: true }
                },
                "401"
            );
            this.datasource.client.getFileContents.returns(Promise.reject(testError));
            return this.datasource
                .load(Credentials.fromPassword("test"))
                .then(() => {
                    throw new Error("Should not have resolved");
                })
                .catch(err => {
                    expect(err.message).to.match(/No handlers registered/i);
                });
        });
    });

    describe("save", function() {
        it("makes a request with the expected parameters", function() {
            return this.datasource
                .save(this.archive._getWestley().history, Credentials.fromPassword("test"))
                .then(() => {
                    expect(this.datasource.client.putFileContents.calledOnce).to.be.true;
                    const args = this.datasource.client.putFileContents.firstCall.args[0];
                    expect(args).to.have.property("id", "abc");
                    expect(args)
                        .to.have.property("contents")
                        .that.matches(/^b~>buttercup\/a/);
                });
        });
    });
});

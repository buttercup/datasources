const AuthManager = require("../source/AuthManager.js");

describe("AuthManager", function() {
    beforeEach(function() {
        this.manager = new AuthManager();
    });

    describe("executeAuthHandlers", function() {
        it("executes handlers with correct properties", function() {
            const fn1 = sinon.spy();
            const fn2 = sinon.spy();
            const ds = {};
            this.manager.registerHandler("googledrive", fn1);
            this.manager.registerHandler("googledrive", fn2);
            return this.manager.executeAuthHandlers("googledrive", ds).then(() => {
                expect(fn1.calledWithExactly(ds)).to.be.true;
                expect(fn2.calledWithExactly(ds)).to.be.true;
                expect(fn1.calledBefore(fn2)).to.be.true;
            });
        });
    });

    describe("registerHandler", function() {
        it("adds handler functions", function() {
            const fn1 = () => {};
            const fn2 = () => {};
            this.manager.registerHandler("googledrive", fn1);
            this.manager.registerHandler("googledrive", fn2);
            expect(this.manager._handlers.googledrive).to.deep.equal([fn1, fn2]);
        });
    });
});

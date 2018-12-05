const { registerDatasourcePostProcessor } = require("../source/DatasourceAdapter.js");
const TextDatasource = require("../source/TextDatasource.js");

describe("DatasourceAdapter", function() {
    describe("registerDatasourcePostProcessor", function() {
        it("gets called when a new Datasource is instantiated", function() {
            const spy = sinon.spy();
            const { remove } = registerDatasourcePostProcessor(spy);
            const tds = new TextDatasource();
            expect(spy.calledOnce).to.be.true;
            expect(spy.calledWithExactly(tds)).to.be.true;
            remove();
        });

        it("calling `remove` removes the registered callback", function() {
            const spy = sinon.spy();
            const { remove } = registerDatasourcePostProcessor(spy);
            remove();
            const tds = new TextDatasource();
            expect(spy.notCalled).to.be.true;
        });
    });
});

module.exports = () => {
    function createClient(...args) {
        createClient.createSpy(...args);
        return {
            getFileContents: () => {},
            putFileContents: () => {}
        };
    }
    createClient.createSpy = sinon.spy();
    return createClient;
};

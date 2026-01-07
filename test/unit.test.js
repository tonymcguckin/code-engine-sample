const assert = require('assert');
const message = require('../utils');
describe('Message Test', () => {
 it('Welcome Message', () => {
        assert.strictEqual(message.getWelcomeMessage(), "Welcome to IBM Cloud DevOps using Code Engine and Github Actions!");
    });
 it('Port Test', () => {
        assert.strictEqual(message.getPortMessage(), "Application Running on port");
    });
});
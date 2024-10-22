import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import sinon from 'sinon'

import {Portfolio} from '../../src/models/portfolio.js'
import {JsonState} from '../../src/state/json-state.js'


describe('list command', () => {
  let stateStub: sinon.SinonStubbedInstance<JsonState>;

  beforeEach(() => {
    // Stub the JsonState class and its methods
    stateStub = sinon.createStubInstance(JsonState);

    // Replace the 'read' method to return dummy data
    stateStub.read.resolves([
      new Portfolio ("Test Portfolio", "Portfolio for tests.")
    ])

    // Stub the constructor of JsonState to always return our stub instance
    sinon.stub(JsonState.prototype, 'read').value(stateStub.read);
  });

  afterEach(() => {
    // Restore original behavior after each test
    sinon.restore();
  });

  it('lists all portfolios and assets', async () => {
    const {stdout} = await runCommand('list')

    expect(stdout).to.contain('Saved Portfolios:')
    expect(stdout).to.contain('- Test Portfolio')
    expect(stdout).to.contain('Saved Assets:')
    expect(stdout).to.contain('- No Saved Assets.')
  });

  it('returns message when no Portfolios or Assets are saved', async () => {
    stateStub.read.resolves([]);
    const {stdout} = await runCommand('list')

    expect(stdout).to.contain('Saved Portfolios:')
    expect(stdout).to.contain('- No Saved Portfolios.')
    expect(stdout).to.contain('Saved Assets:')
    expect(stdout).to.contain('- No Saved Assets.')
  }); 

  describe('list command with flags', () => {
    it('lists portfolios only with -p', async () => {
      const {stdout} = await runCommand('list -p')

      expect(stdout).to.contain('Saved Portfolios:')
      expect(stdout).to.not.contain('Saved Assets:')
    });

    it('lists portfolios only with --portfolios', async () => {
      const {stdout} = await runCommand('list --portfolios')

      expect(stdout).to.contain('Saved Portfolios:')
      expect(stdout).to.not.contain('Saved Assets:')
    });

    it('lists assets only with -a', async () => {
      const {stdout} = await runCommand('list -a')

      expect(stdout).to.contain('Saved Assets:')
      expect(stdout).to.not.contain('Saved Portfolios:')
    });

    it('lists assets only with --assets', async () => {
      const {stdout} = await runCommand('list --assets')

      expect(stdout).to.contain('Saved Assets:')
      expect(stdout).to.not.contain('Saved Portfolios:')
    });
  });
});
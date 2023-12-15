import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

// TODO: Replace with proper setup
import { meowWithSubcommands } from '../index.js';

chai.use(sinonChai);
chai.should();

describe('meowWithSubcommands()', () => {
  it('should route the commands correctly', async () => {
    const run = sinon.stub().resolves();

    await meowWithSubcommands(
      {
        foo: {
          description: 'Do something very foo-like',
          run,
        },
      },
      {
        argv: ['foo', 'bar'],
        name: 'name-of-cli',
        importMeta: import.meta,
      }
    );

    run.should.have.been.calledOnceWith(['bar']);
  });
});

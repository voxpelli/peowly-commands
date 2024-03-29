import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

// TODO: Replace with proper setup
import { peowlyCommands } from '../index.js';

chai.use(sinonChai);
chai.should();

describe('peowlyCommands()', () => {
  it('should route the commands correctly', async () => {
    const run = sinon.stub().resolves();

    await peowlyCommands(
      {
        foo: {
          description: 'Do something very foo-like',
          run,
        },
      },
      {
        args: ['foo', 'bar'],
        name: 'name-of-cli',
        importMeta: import.meta,
      }
    );

    run.should.have.been.calledOnceWith(['bar']);
  });
});

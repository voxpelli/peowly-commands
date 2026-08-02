import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

// TODO: Replace with proper setup
import { peowlyCommands } from '../index.js';

describe('peowlyCommands()', () => {
  it('should route the commands correctly', async () => {
    const run = mock.fn();

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

    assert.strictEqual(run.mock.callCount(), 1);
    assert.deepStrictEqual(run.mock.calls[0].arguments[0], ['bar']);
  });
});

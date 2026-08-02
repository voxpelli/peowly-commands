import assert from 'node:assert/strict';
// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { describe, it, mock } from 'node:test';

// TODO: Replace with proper setup
import { peowlyCommands, PeowlyCommandMissingError, PeowlyCommandOmittedError } from '../index.js';

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
    assert.ok(run.mock.calls[0]);
    assert.deepStrictEqual(run.mock.calls[0].arguments[0], ['bar']);
  });

  describe('skipHelpFallback', () => {
    it('should throw PeowlyCommandOmittedError when no command is given', async () => {
      await assert.rejects(
        peowlyCommands(
          {
            foo: {
              description: 'Do something very foo-like',
              run: mock.fn(),
            },
          },
          {
            args: [],
            name: 'name-of-cli',
            importMeta: import.meta,
            skipHelpFallback: true,
          }
        ),
        PeowlyCommandOmittedError
      );
    });

    it('should still run a valid command when skipHelpFallback is true', async () => {
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
          skipHelpFallback: true,
        }
      );

      assert.strictEqual(run.mock.callCount(), 1);
    });

    it('should still throw PeowlyCommandMissingError for unknown commands', async () => {
      await assert.rejects(
        peowlyCommands(
          {
            foo: {
              description: 'Do something very foo-like',
              run: mock.fn(),
            },
          },
          {
            args: ['unknown'],
            name: 'name-of-cli',
            importMeta: import.meta,
            skipHelpFallback: true,
          }
        ),
        PeowlyCommandMissingError
      );
    });

    it('should show help by default when no command is given', async () => {
      const originalExit = process.exit;
      // eslint-disable-next-line no-console
      const originalLog = console.log;
      const exitMock = mock.fn();
      const logMock = mock.fn();

      process.exit = /** @type {(code?: number) => never} */ (/** @type {unknown} */ (exitMock));
      // eslint-disable-next-line no-console
      console.log = /** @type {(...args: any[]) => void} */ (logMock);

      try {
        await peowlyCommands(
          {
            foo: {
              description: 'Do something very foo-like',
              run: mock.fn(),
            },
          },
          {
            args: [],
            name: 'name-of-cli',
            importMeta: import.meta,
          }
        );
      } catch {
        // showHelp calls process.exit which throws, but we mock it
      } finally {
        process.exit = originalExit;
        // eslint-disable-next-line no-console
        console.log = originalLog;
      }

      assert.strictEqual(exitMock.mock.callCount(), 1);
      assert.ok(exitMock.mock.calls[0]);
      assert.strictEqual(exitMock.mock.calls[0].arguments[0], 2);
      assert.strictEqual(logMock.mock.callCount(), 1);
    });
  });

  describe('PeowlyCommandOmittedError', () => {
    it('should have the correct name and message', () => {
      const showHelp = /** @type {(exitCode?: number) => never} */ (/** @type {unknown} */ (mock.fn()));
      const error = new PeowlyCommandOmittedError(showHelp);

      assert.strictEqual(error.name, 'PeowlyCommandOmittedError');
      assert.strictEqual(error.message, 'Command omitted');
      assert.strictEqual(error.showHelp, showHelp);
    });
  });
});

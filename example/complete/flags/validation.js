import { prepareFlags } from '../../../index.js';

export const validationFlags = prepareFlags({
  strict: {
    type: 'boolean',
    'default': false,
    description: 'Exits with an error code if any matching issues are found',
  },
});

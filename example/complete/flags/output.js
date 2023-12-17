import { prepareFlags } from '../../../index.js';

export const outputFlags = prepareFlags({
  json: {
    'default': false,
    description: 'Output result as json',
    listGroup: 'Output',
    shortFlag: 'j',
    type: 'boolean',
  },
  markdown: {
    'default': false,
    description: 'Output result as markdown',
    listGroup: 'Output',
    shortFlag: 'm',
    type: 'boolean',
  },
});

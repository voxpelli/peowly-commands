export const outputFlags = /** @satisfies {import('peowly').AnyFlags} */ ({
  json: {
    'default': false,
    description: 'Output result as json',
    listGroup: 'Output',
    'short': 'j',
    type: 'boolean',
  },
  markdown: {
    'default': false,
    description: 'Output result as markdown',
    listGroup: 'Output',
    'short': 'm',
    type: 'boolean',
  },
});

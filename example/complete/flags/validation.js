export const validationFlags = /** @satisfies {import('peowly').AnyFlags} */ ({
  strict: {
    type: 'boolean',
    'default': false,
    description: 'Exit with an error code if any matching issues are found',
  },
});

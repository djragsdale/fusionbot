module.exports = {
  parserOptions: {
    sourceType: 'script',
  },
  extends: 'airbnb-base',
  rules: {
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    strict: ['error', 'global'],
  },
};

const { defineTest } = require('jscodeshift/dist/testUtils');
defineTest(__dirname, 'import-all-effect');
defineTest(__dirname, 'import-all-effect', {}, 'import-all-effect-not-exist');
defineTest(
  __dirname,
  'import-all-effect',
  {},
  'import-all-effect-already-exist'
);

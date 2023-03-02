module.exports = {
  '*.{js,ts}': [
    'eslint --max-warnings=0',
    () => 'tsc-files --noEmit',
  ],
  '*.{js,ts,json,css,}': ['prettier --write'],
};

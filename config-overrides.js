const { alias, configPaths } = require('react-app-rewire-alias');
const { override, useBabelRc } = require('customize-cra');

module.exports = override(
  useBabelRc(),
  alias({
    ...configPaths('tsconfig.paths.json')
  })
)

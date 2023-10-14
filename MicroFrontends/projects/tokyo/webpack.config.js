const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'tokyo',

  exposes: {
    // Adjusted line:
    './Module': './projects/tokyo/src/app/invoice-lines-tokyo/invoice-lines-tokyo.module.ts'
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});

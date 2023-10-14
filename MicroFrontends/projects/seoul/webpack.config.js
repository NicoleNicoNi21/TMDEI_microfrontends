const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'seoul',

  exposes: {
    // Adjusted line:
    './Module': './projects/seoul/src/app/invoice-lines-seoul/invoice-lines-seoul.module.ts'
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});

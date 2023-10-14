const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'invoiceGeneral',

  exposes: {
    // Adjusted line:
    './Module': './projects/invoiceGeneral/src/app/invoice-form/invoice-form.module.ts',
    './ModuleA': './projects/invoiceGeneral/src/app/buttons/buttons.module.ts'
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});

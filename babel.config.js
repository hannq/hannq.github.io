const { generateScopedNameFactory } = require('@dr.pogodin/babel-plugin-react-css-modules/utils');

module.exports = {
  presets: [
    [
      "babel-preset-gatsby",
      {
        "targets": {
          "browsers": [">0.25%", "not dead"]
        }
      }
    ]
  ],
  plugins: [
    [
      '@dr.pogodin/react-css-modules',
      {
        webpackHotModuleReloading: true,
        autoResolveMultipleImports: true,
        generateScopedName: generateScopedNameFactory('[local]___[hash:base64:5]'),
        filetypes: {
          '.less': {
            syntax: 'postcss-less',
          },
        },
      },
    ],
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
      },
    ],
  ],
}



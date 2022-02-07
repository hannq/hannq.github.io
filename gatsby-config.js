const { generateScopedNameFactory } = require('@dr.pogodin/babel-plugin-react-css-modules/utils');

module.exports = {
  siteMetadata: {
    title: `Hannq'S Blog`,
    siteUrl: `https://hannq.github.io`
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        "trackingId": "G-K2P39MD9DQ"
      }
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        loaderOptions: {},
        lessOptions: {
          modifyVars: {},
          javascriptEnabled: true,
        },
        cssLoaderOptions: {
          modules: {
            getLocalIdent: (context, _localIdentName, localName, _options) => {
              return generateScopedNameFactory('[local]___[hash:base64:5]')(localName, context.resourcePath);
            }
          }
        },
      },
    },
    `babel-preset-gatsby`,
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    }
  ]
};

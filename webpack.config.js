const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const mode = (process.env.NODE_ENV === 'production') ? 'production' : 'development'
const assetHash = (mode === 'production')? '-[fullhash:8]' : ''
const jsFilenameTemplate = `javascripts/[name]${assetHash}.js`
const cssFilenameTemplate = `stylesheets/[name]${assetHash}.css`
const isProduction = mode === 'production'

const extraPlugins = []
if (isProduction) {
  extraPlugins.push(new CompressionPlugin({
    compressionOptions: {cache: true}
  }))
}

const extractMiniCss = new MiniCssExtractPlugin({
  filename: cssFilenameTemplate
})

module.exports = {
  mode,
  entry: {
    application: './source/javascripts/index.js',
    styles: './source/stylesheets/_application.scss'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'source/stylesheets'),
      path.join(__dirname, 'source/javascripts'),
      'node_modules',
      'node_modules/bootstrap',
      'node_modules/bootstrap-select',
      'node_modules/bootstrap-italia'
    ],
    alias: {
      modernizr$: path.resolve(__dirname, '.modernizrrc.js')
    }
  },
  output: {
    path: path.resolve(__dirname, '.tmp/dist'),
    filename: jsFilenameTemplate,
    publicPath: ''
  },
  module: {
    rules: [
      {
        loader: 'webpack-modernizr-loader',
        test: /\.modernizrrc\.js$/
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        enforce: 'pre',
        test: /\.s[ac]ss/,
        use: 'import-glob-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentedSyntax: false
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: {
          name: '/fonts/[name].[ext]',
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new SVGSpritemapPlugin(
      [
        path.join(__dirname, 'node_modules/bootstrap-italia/src/svg/*.svg'),
      ],
      {
        output: {
          filename: 'images/sprite.svg',
          svgo: {
            multipass: true,
            pretty: true,
            plugins: [
              {cleanupAttrs: true},
              {cleanupEnableBackground: true},
              {cleanupIDs: true},
              {cleanupListOfValues: true},
              {cleanupNumericValues: true},
              {collapseGroups: true},
              {convertColors: true},
              {convertPathData: true},
              {convertShapeToPath: true},
              {convertStyleToAttrs: true},
              {convertTransform: true},
              {mergePaths: true},
              {moveElemsAttrsToGroup: true},
              {moveGroupAttrsToElems: true},
              //{removeAttrs: {attrs: '(fill|stroke)'}}, // if you don't want any color from the original SVG - see also the removeStyleElement option
              {removeComments: true},
              {removeDesc: false}, // for usability reasons
              {removeDimensions: true},
              {removeDoctype: true},
              {removeEditorsNSData: true},
              {removeEmptyAttrs: true},
              {removeEmptyContainers: true},
              {removeEmptyText: true},
              {removeHiddenElems: true},
              {removeMetadata: true},
              {removeNonInheritableGroupAttrs: true},
              {removeRasterImages: true}, // bitmap! you shall not pass!
              {removeScriptElement: true}, // shoo, javascript!
              //{removeStyleElement: true}, // if you really really want to remove ANY <style> tag from the original SVG, watch out as it could be too much disruptive - see also the removeAttrs option
              {removeTitle: false}, // for usability reasons
              {removeUnknownsAndDefaults: true},
              {removeUnusedNS: true},
              {removeUselessDefs: true},
              {removeUselessStrokeAndFill: true},
              {removeViewBox: false},
              {removeXMLProcInst: true},
              {sortAttrs: true}
            ]
          }
        },
        sprite: {
          prefix: false
        }
      }
    ),
    extractMiniCss,
    ...extraPlugins
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin()]
  }
}

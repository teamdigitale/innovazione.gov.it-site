const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const extractMiniCss = new MiniCssExtractPlugin({
  filename: "stylesheets/[name].css",
});

module.exports = {
  entry: {
    application: "./source/javascripts/index.js",
    styles: "./source/stylesheets/_application.scss",
  },
  resolve: {
    modules: [
      path.join(__dirname, "source/stylesheets"),
      path.join(__dirname, "source/javascripts"),
      "node_modules",
      "node_modules/bootstrap",
      "node_modules/bootstrap-italia",
    ],
  },
  output: {
    path: path.resolve(__dirname, ".tmp/dist"),
    filename: "javascripts/[name].js",
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        enforce: "pre",
        test: /\.s[ac]ss/,
        use: "import-glob-loader",
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                indentedSyntax: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: "file-loader",
        options: {
          name: "/fonts/[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new SVGSpritemapPlugin(
      [path.join(__dirname, "node_modules/bootstrap-italia/src/svg/*.svg")],
      {
        output: {
          filename: "images/sprite.svg",
          svgo: {
            multipass: true,
            pretty: true,
            plugins: [
              { name: "cleanupAttrs", active: true },
              { name: "cleanupEnableBackground", active: true },
              { name: "cleanupIDs", active: true },
              { name: "cleanupListOfValues", active: true },
              { name: "cleanupNumericValues", active: true },
              //{ name: "collapseGroup", active: true },
              { name: "convertColors", active: true },
              { name: "convertPathData", active: true },
              { name: "convertShapeToPath", active: true },
              { name: "convertStyleToAttrs", active: true },
              { name: "convertTransform", active: true },
              { name: "mergePaths", active: true },
              { name: "moveElemsAttrsToGroup", active: true },
              { name: "moveGroupAttrsToElems", active: true },
              //{removeAttrs: {attrs: '(fill|stroke)'}}, // if you don't want any color from the original SVG - see also the removeStyleElement option
              { name: "removeComments", active: true },
              { name: "removeDesc", active: false }, // for usability reasons
              { name: "removeDimensions", active: true },
              { name: "removeDoctype", active: true },
              { name: "removeEditorsNSData", active: true },
              { name: "removeEmptyAttrs", active: true },
              { name: "removeEmptyContainers", active: true },
              { name: "removeEmptyText", active: true },
              { name: "removeHiddenElems", active: true },
              { name: "removeMetadata", active: true },
              { name: "removeNonInheritableGroupAttrs", active: true },
              { name: "removeRasterImages", active: true }, // bitmap! you shall not pass!
              { name: "removeScriptElement", active: true }, // shoo, javascript!
              //{removeStyleElement: true}, // if you really really want to remove ANY <style> tag from the original SVG, watch out as it could be too much disruptive - see also the removeAttrs option
              { name: "removeTitle", active: false }, // for usability reasons
              { name: "removeUnknownsAndDefaults", active: true },
              { name: "removeUnusedNS", active: true },
              { name: "removeUselessDefs", active: true },
              { name: "removeUselessStrokeAndFill", active: true },
              { name: "removeViewBox", active: false },
              { name: "removeXMLProcInst", active: true },
              { name: "sortAttrs", active: true },
            ],
          },
        },
        sprite: {
          prefix: false,
        },
      }
    ),
    extractMiniCss,
    new CompressionPlugin({
      compressionOptions: { cache: true },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};

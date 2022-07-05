const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}
console.log("-------------->", process.env.NODE_ENV);

// style files regexes
// const cssRegex = /\.css$/;
// const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/i;
const lessModuleRegex = /\.module\.(less)$/;
const publicUrl = "/public";

module.exports = function () {
  return {
    mode: process.env.NODE_ENV || "development",
    devtool: "inline-source-map",
    entry: {
      index: "./src/index.tsx",
    },
    output: {
      publicPath: "/",
      filename: "[name].[contenthash:8].js",
      path: path.resolve(__dirname, "build"),
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", "jsx"],
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(js|jsx)$/,
              use: [
                {
                  //用 babel-loader 把es6转es5
                  loader: require.resolve("babel-loader"),
                },
              ],
              exclude: /node_modules/,
            },
            {
              test: /\.(ts|tsx)$/,
              use: [
                {
                  //用 babel-loader 把es6转es5
                  loader: require.resolve("babel-loader"),
                },
                {
                  loader: require.resolve("ts-loader"),
                },
              ],
              exclude: /node_modules/,
            },
            {
              test: lessRegex,
              exclude: lessModuleRegex,
              use: [
                { loader: require.resolve("style-loader") },
                { loader: require.resolve("css-loader") },
                { loader: require.resolve("postcss-loader") },
                { loader: require.resolve("less-loader") },
              ],
              sideEffects: true,
            },
            {
              test: /\.css$/,
              use: [
                { loader: require.resolve("style-loader") },
                { loader: require.resolve("css-loader") },
                { loader: require.resolve("postcss-loader") },
              ],
            },
            {
              test: /\.(json)$/,
              use: [
                {
                  loader: require.resolve("file-loader"),
                },
              ],
            },
            {
              test: /\.(png|jpe?g|gif)$/i,
              use: [
                {
                  loader: "url-loader",
                },
              ],
            },
          ],
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "./"),
      },
      compress: true,
      port: 9000,
      historyApiFallback: true,
      hot: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html"),
        favicon: path.resolve(__dirname, "./public/favicon.ico"),
        filename: "index.html",
      }),
      new InterpolateHtmlPlugin({
        PUBLIC_URL: publicUrl,
      }),
    ],
  };
};

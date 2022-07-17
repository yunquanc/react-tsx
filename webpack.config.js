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
              test: /\.less$/,
              use: [
                {
                  loader: "style-loader",
                },
                {
                  loader: "css-loader", // translates CSS into CommonJS
                },
                {
                  loader: "less-loader", // compiles Less to CSS
                  options: {
                    lessOptions: {
                      // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                      modifyVars: {
                        "primary-color": "#1DA57A",
                        "link-color": "#1DA57A",
                        "border-radius-base": "2px",
                      },
                      javascriptEnabled: true,
                    },
                  },
                },
              ],
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
      proxy: {
        // 配置代理（只在本地开发有效，上线无效）
        "/api": {
          target: "http://localhost:3000", // 这是本地用node写的一个服务，用webpack-dev-server起的服务默认端口是8080
          // pathRewrite: { "/api": "" }, // 后台在转接的时候url中是没有 /api 的
          changeOrigin: true, // 加了这个属性，那后端收到的请求头中的host是目标地址 target
        },
      },
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

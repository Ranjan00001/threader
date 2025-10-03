const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
require("dotenv").config()

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
    clean: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "Threader"
    }),
    new DefinePlugin({
      "process.env.REACT_APP_API_BASE_URL": JSON.stringify(process.env.REACT_APP_API_BASE_URL),
      "process.env.REACT_APP_ENV": JSON.stringify(process.env.REACT_APP_ENV)
    })
  ],
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all"
    }
  }
};

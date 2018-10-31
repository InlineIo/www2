const path = require("path");

module.exports = {
  entry: {
    projects: "./modules/projects/client/index.js",
    session: "./modules/session/client/index.js",
    users: "./modules/users/client/index.js"
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public")
  },

  mode: "production",
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        use: [
          { loader: "babel-loader" }
        ]
      }
    ]
  }
}

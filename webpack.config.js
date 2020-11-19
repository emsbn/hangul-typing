const path = require("path");

module.exports = {
  entry: {
    hangulTyping: path.resolve(__dirname, "src"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
};
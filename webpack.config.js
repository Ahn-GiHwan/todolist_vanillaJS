const path = require("path");

module.exports = {
  // 시작하는 js파일
  entry: "./index.js",

  // 번들한 파일에 대한 설정
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};

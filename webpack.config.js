const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 시작하는 js파일
  entry: "./index.js",

  // 번들한 파일에 대한 설정
  output: {
    // 번들한 파일 이름
    filename: "main.js",
    // 번들할 파일 경로
    path: path.resolve(__dirname, "dist"),
  },

  // html 설정
  plugins: [
    new HtmlWebpackPlugin({
      // 기존의 html파일을 사용
      template: "./index.html",
    }),
  ],
};

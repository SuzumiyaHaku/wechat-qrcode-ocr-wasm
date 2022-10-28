const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const isDev =
  process.env.NODE_ENV === "development" ||
  process.env.npm_lifecycle_event === "dev";
const outDir = process.env.EXAMPLE_ENV ? "example" : "lib";

const getPattern = (str, args = {}) => ({
  from: path.join(__dirname, str),
  to: path.join(__dirname, `./${outDir}/${str.replace("/src", "")}`),
  ...args,
});
const patterns = ["./static", "./package.json", "./README.md"].map((v) =>
  getPattern(v)
);
patterns.push(getPattern("./LICENSE", { toType: "file" }));
const plugins = [
  new ESLintPlugin({
    extensions: ["ts"],
  }),
  new CopyPlugin({
    patterns,
  }),
];

if (isDev || process.env.EXAMPLE_ENV) {
  patterns.push(getPattern("./src/assets"));
  plugins.unshift(
    new HTMLWebpackPlugin({
      title: "loader",
      template: path.resolve(__dirname, "./src/playground/test.html"),
    })
  );
}
console.log(
  "mode: ",
  isDev ? "development" : "production " + process.env.EXAMPLE_ENV
);
module.exports = {
  mode: isDev ? "development" : "production",
  target: ["web", "es2020"],
  entry: path.resolve(
    __dirname,
    isDev || process.env.EXAMPLE_ENV
      ? "./src/playground/test.ts"
      : "./src/index.ts"
  ),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, outDir),
    clean: true,
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".js", ".ts", ".json", ".wasm"],
  },
  experiments: {
    topLevelAwait: true,
  },
  devtool: "source-map",
  devServer: {
    port: 3002,
    compress: true,
    hot: true,
  },
  cache: {
    type: "filesystem",
    allowCollectingMemory: true,
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|jpeg|gif|webp)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
        generator: {
          filename: "./assets/imgs/[name].[ext]",
        },
      },
      {
        test: /\.(js|ts)$/i,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins,
};

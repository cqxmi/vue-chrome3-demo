const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

// 只需要复制的文件
const copyFiles = [
  {
    from: path.resolve(`src/manifest.json`),
    to: `${path.resolve("dist")}/manifest.json`,
  },
  {
    from: path.resolve("src/assets"),
    to: path.resolve("dist/assets"),
  },
];

const plugins = [
  new CopyWebpackPlugin({
    patterns: copyFiles,
  }),
];

// 配置页面
const pages = {};
/**
 * popup 和 devtool 都需要html文件
 * 因此 chromeName 还可以添加devtool
 */
const chromeName = ["popup"];

chromeName.forEach((name) => {
  pages[name] = {
    entry: `src/${name}/index.js`,
    template: `src/${name}/index.html`,
    filename: `${name}.html`,
  };
});

module.exports = {
  pages,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  configureWebpack: {
    // 多入口打包
    entry: {
      content: "./src/content/index.js",
      background: "./src/background/index.js",
    },
    output: {
      filename: "js/[name].js",
    },
    plugins,
    optimization: {
      splitChunks: false,
    },
  },
  css: {
    extract: {
      filename: "css/[name].css",
    },
  },
};

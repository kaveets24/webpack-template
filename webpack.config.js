const path = require("path");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Useful for splitting CSS out from the main application.
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpack = require("webpack"); // For Hot-Module-Replacement-Plugin

const developmentMode = process.env.NODE_ENV !== "production";

module.exports = {
  mode: "development",
  entry: {
    main: ["./src/js/main.js", "webpack-hot-middleware/client"]
  },
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
<<<<<<< HEAD
      title: "Thirdwave Webpack Example",
      template: "./src/index.html",
=======
      title: "Output Management",
      template: "./src/index.html",
      excludeChunks: ["sliderPage"]
>>>>>>> 41d4eacb10d0bea91e578ede7b4c36bd4471f22a
    }),
    new MiniCssExtractPlugin({
      filename: developmentMode ? "[name].css" : "[name].[hash].css"
    })
  ],
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: "all"
    }
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: [":data-src"]
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Extracts css from bundle.js and puts it into its own file.
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: developmentMode
            }
          },

          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS.
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  }
};

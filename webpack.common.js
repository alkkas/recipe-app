const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = ['index', 'fridge', 'fav'];


module.exports = {
  entry: pages.reduce((config, page) => {
    config[`./assets/js/${page}`] =  `./src/js/${page}/${page}.js`;
    return config;
  }, {}),
  plugins: [].concat(
    pages.map(
      (page) => {
          return new HtmlWebpackPlugin({
            inject: "body",
            template: `./src/pug/${page}/${page}.pug`,
            filename: `${page}.html`,
            chunks: [`./assets/js/${page}`],
            minify: false
          })
      }
    ),
  ),
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'sass-loader'
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        // type: 'asset/resource',
        loader: 'file-loader',
        options: {
          name(path) {
            return "assets/" + path.split("src\\")[1];
          }
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, `dist/`),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

const path = require('path');
const webpack = require('webpack');

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './app/main',
    'webpack-hot-middleware/client',
  ],
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js',
    publicPath: '/js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            ['react-transform', {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module'],
                },
                {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react'],
                },
              ],
            }],
          ],
        },
      },
    ],
  },
};

/*
if (process.env.NODE_ENV !== 'production') {
  const transform = {
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module'],
  };
  config.entry.push('webpack-hot-middleware/client');
  config.module.loaders[0].query.plugins.push(transform);
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}
*/

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    })
  );
}

module.exports = config;

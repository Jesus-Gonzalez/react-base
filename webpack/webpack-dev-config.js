import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin'
const mainPath = path.resolve(__dirname, '..');
const clientPath = path.resolve(__dirname, '..', 'app', 'client/');

export const devContext = path.resolve(__dirname, '../app');

export const devPlugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.DedupePlugin(),
  new ExtractTextPlugin('bundle.css'),
  function(){
    this.plugin("done", function(stats){
      if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1){
        console.log(stats.compilation.errors)
        //throw new Error(stats.compilation.errors);
      }
    });
  }
];

export const devEntries = [
  clientPath,
  'webpack/hot/dev-server',
  'webpack-hot-middleware/client'
];

export const devLoaders = [
  { test: [/\.js$/, /\.jsx$/],loader: 'babel',exclude: /node_modules/,include: mainPath, query: { presets: ["react-hmre", "es2015", "stage-0", "react"] }},
  { test: /\.css/, loader: ExtractTextPlugin.extract('style-loader',  'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]-[hash:base64:4]!postcss-loader')}
];

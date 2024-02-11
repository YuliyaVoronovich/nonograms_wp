const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  entry: ["@babel/polyfill", path.resolve(__dirname, 'src', 'index.js')],
  module: {
    rules: [
      { test: /\.(c|sa|sc)ss$/, 
      use: [ 
        devMode ? 'style-loader': MiniCssExtractPlugin.loader, 
        'css-loader', 
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('postcss-preset-env')],
            }
          }
        },
        'sass-loader'
      ] },
      { test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              "@babel/plugin-syntax-import-attributes"
            ]
          }
        }
      },
      { test: /\.html$/, use: 'html-loader' },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
          name: 'assets/audio/[hash].[ext]'
        }
      },
      { test: /\.woff2?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      { test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }          
        ],
        type: 'asset/resource'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]'
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
    new MiniCssExtractPlugin(
      {
        filename: '[name].[contenthash].css',
      })
  ],  
  resolveLoader: {
    modules: [
        path.join(__dirname, 'node_modules')
    ]
  },
  resolve: {
      modules: [
          path.join(__dirname, 'node_modules')
      ]
  }
};
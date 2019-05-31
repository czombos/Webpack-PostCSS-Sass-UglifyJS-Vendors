const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const config = {
	mode: 'production',
	context: __dirname + "/",
	entry: [
		'./sass/app.sass',
		'./js/app.js'
	],
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, './'),
		publicPath: "/"
	},
	devServer: {
		contentBase: path.join(__dirname, './'),
		compress: true,
		port: 9000
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		new MiniCssExtractPlugin({
			filename: "css/bundle.css",
		})
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-syntax-dynamic-import']
					}
				}
			}, {
				test: /\.(sass|scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					}, {
						loader: 'css-loader', // translates CSS into CommonJS modules
						options: {
							sourceMap: true
						}
					}, {
						loader: 'postcss-loader', // Run post css actions
						options: {
							sourceMap: true,
							plugins: function () { // post css plugins, can be exported to postcss.config.js
								return [
									require('autoprefixer')()/*,
									require('cssnano')()*/
								];
							}
						}
					}, {
						loader: 'sass-loader', // compiles Sass to CSS
						options: {
							sourceMap: true,
							outputStyle: 'expanded',
							precision: 6
						}
					}
				]
			}, {
				test: /\.(ttf|eot|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'media/fonts/[name].[ext]',
							publicPath: '/'
						}
					}
				]
			}, {
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'media/images/[name].[ext]',
							publicPath: '/'
						}
					}
				]
			}/*, {
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'url-loader', // transforms files into base64 URIs
						options: {
							limit: 10000
						}
					}
				]
			}*/
		]
	}
}

module.exports = config;
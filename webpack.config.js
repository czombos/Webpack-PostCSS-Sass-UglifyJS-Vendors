const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	mode: 'production',
	context: __dirname + "/",
	entry: [
		'./sass/app.sass',
		'./js/app.js'
	],
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, './')
	},
	performance: {
		hints: false
	},
	plugins: [
		new UglifyJsPlugin({
			parallel: true,
			uglifyOptions: {
				//ecma: 6,
				compress: false // hangs without this
			},
			cache: path.join(__dirname, 'tmp/webpack-cache/uglify-cache'),
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: ['popper.js', 'default']
		}),
		new ExtractTextPlugin('css/bundle.css')
	],
	module: {
		rules: [
			{
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
			},
			{
				test: /\.(scss|sass)$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: function () {
									return [
										require('autoprefixer')(),
										require('cssnano')()
									];
								}
							}
						},
						{
							loader: 'sass-loader',
							options: {
								outputStyle: 'expanded',
								precision: 6
							}
						}
					]
				})
			}, {
				test: /\.(eot|woff|woff2|ttf|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'media/fonts/[name].[ext]',
							publicPath: '/'
						}
					}
				]
			}
		]
	}
}

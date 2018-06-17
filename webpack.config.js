'use strict';

const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OfflinePlugin = require('offline-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const VueLoader = require('vue-loader');

const devMode = process.env.NODE_ENV !== 'production';

const VueStyleLoader = devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader;

const config = {
	context: path.resolve(__dirname),
	mode: process.env.NODE_ENV,
	performance: {
		hints: devMode
	},
	entry: {
		bundle: './src/app.js'
	},
	target: 'web',
	devtool: 'source-map',
	node: {
		global: false
	},
	output: {
		filename: '[name].js',
		publicPath: devMode ? '/' : './',
		path: path.resolve(__dirname, './dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/,
				options: {
					loaders: {
						'styl': [VueStyleLoader, 'css-loader', 'stylus-loader'],
						'scss': [VueStyleLoader, 'css-loader', 'sass-loader'],
						'sass': [VueStyleLoader, 'css-loader', 'sass-loader?indentedSyntax'],
						'css': [VueStyleLoader, 'css-loader']
					}
				}
			},
			{
				test: /\.css$/,
				use: [VueStyleLoader, 'css-loader']
			},
			{
				test: /\.styl$/,
				use: [VueStyleLoader, 'css-loader', 'stylus-loader']
			},
			{
				test: /\.scss$/,
				use: [VueStyleLoader, 'css-loader', 'sass-loader?sourceMap']
			},
			{
				test: /\.sass$/,
				use: [VueStyleLoader, 'css-loader', 'sass-loader?indentedSyntax']
			}
		]
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: pkg.name,
			inject: 'body',
			cache: false,
			meta: {
				viewport: 'width=device-width, initial-scale=1',

			},
			minify: { html5: true, collapseWhitespace: true, minifyCSS: true, minifyJS: true, minifyURLs: false, removeAttributeQuotes: true, removeComments: true, removeEmptyAttributes: true, removeRedundantAttributes: true, removeScriptTypeAttributes: true, removeStyleLinkTypeAttributese: true, useShortDoctype: true }
		}),
		new VueLoader.VueLoaderPlugin(),
		new CopyWebpackPlugin([
			{ from: path.resolve(__dirname, './static'), to: './static' }
		]),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
			options: { minimize: true }
		}),
		new OfflinePlugin(),
		new WebpackPwaManifest({
			name: pkg.name,
			short_name: pkg.name,
			description: pkg.description,
			background_color: '#000000',
			inject: true,
			ios: true,
			filename: 'manifest.json'
		})
	],
	optimization: {
		minimize: true,
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					name: 'vendor',
					chunks: 'initial',
					enforce: true
				}
			}
		}
	}
};

module.exports = config;

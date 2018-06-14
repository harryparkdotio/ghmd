'use strict';

const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoader = require('vue-loader');

const VueStyleLoader = process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader;

module.exports = {
	context: path.resolve(__dirname),
	mode: process.env.NODE_ENV,
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
		publicPath: './',
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
						'sass': [VueStyleLoader, 'css-loader', 'sass-loader?indentedSyntax']
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
				viewport: 'width=device-width, initial-scale=1'
			},
			minify: { html5: true, collapseWhitespace: true, minifyCSS: true, minifyJS: true, minifyURLs: false, removeAttributeQuotes: true, removeComments: true, removeEmptyAttributes: true, removeRedundantAttributes: true, removeScriptTypeAttributes: true, removeStyleLinkTypeAttributese: true, useShortDoctype: true }
		}),
		new VueLoader.VueLoaderPlugin(),
		new CopyWebpackPlugin([
			{ from: path.resolve(__dirname, './static/sw.js'), to: './sw.js' },
			{ from: path.resolve(__dirname, './static'), to: './static', ignore: ['sw.js'] }
		]),
		new MiniCssExtractPlugin({
			filename: 'main.css'
		})
	],
	optimization: {
		minimize: true,
		splitChunks: {
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

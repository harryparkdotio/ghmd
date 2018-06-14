const path = require('path');
const VueLoader = require('vue-loader');

const cssLoader = 'css-loader?minimize&keepBreaks&keepSpecialComments=0';

module.exports = {
	context: path.resolve(__dirname),
	mode: process.env.NODE_ENV,
	entry: {
		bundle: './src/app.js'
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		overlay: true
	},
	output: {
		filename: '[name].js',
		publicPath: '/dist/',
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
						'styl': ['vue-style-loader', cssLoader, 'stylus-loader'],
						'scss': ['vue-style-loader', cssLoader, 'sass-loader'],
						'sass': ['vue-style-loader', cssLoader, 'sass-loader?indentedSyntax']
					}
				}
			},
			{
				test: /\.css$/,
				use: ['vue-style-loader', cssLoader]
			},
			{
				test: /\.styl$/,
				use: ['vue-style-loader', cssLoader, 'stylus-loader']
			},
			{
				test: /\.scss$/,
				use: ['vue-style-loader', cssLoader, 'sass-loader']
			},
			{
				test: /\.sass$/,
				use: ['vue-style-loader', cssLoader, 'sass-loader?indentedSyntax']
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: { name: '[name].[ext]?[hash]' }
			}
		]
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', '*'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [
		new VueLoader.VueLoaderPlugin()
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

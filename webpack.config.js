const path = require('path');
const VueLoader = require('vue-loader');

module.exports = {
	context: path.resolve(__dirname),
	mode: 'development',
	entry: {
		app: './src/app.js'
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		overlay: true
	},
	output: {
		filename: 'bundle.js',
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
				use: 'vue-loader',
				exclude: /node_modules/
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
		new VueLoader.VueLoaderPlugin()
	],
	devtool: 'inline-source-map'
};

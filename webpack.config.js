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
				loader: 'vue-loader',
				exclude: /node_modules/,
				options: {
					loaders: {
						'styl': ['vue-style-loader', 'css-loader', 'stylus-loader'],
						'scss': ['vue-style-loader', 'css-loader', 'sass-loader'],
						'sass': ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
					}
				}
			},
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			},
			{
				test: /\.styl$/,
				use: ['vue-style-loader', 'css-loader', 'stylus-loader']
			},
			{
				test: /\.scss$/,
				use: ['vue-style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.sass$/,
				use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
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
	devtool: 'inline-source-map'
};

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
	devtool: 'eval-source-map', // 可以使我们调试的时候定位到具体代码
	entry: [
		'eventsource-polyfill', // necessary for hot reloading with IE
		'webpack-hot-middleware/client?reload=true',
		'./src/js/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'js/bundle.js',
		chunkFilename: 'js/[id].bundle.js',
		publicPath: '/static/',
		pathinfo: true
	},
	devServer: {
		contentBase: '',  //静态资源的目录 相对路径,相对于当前路径 默认为当前config所在的目录
		devtool: 'eval',
		hot: true,        //自动刷新
		inline: true,
		port: 3005
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			DEBUG: true
		}),
		new ExtractTextPlugin('css/app.css', {
			allChunks: false
		})
	],
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				loaders: ['babel'],
				include: path.join(__dirname, 'src/js')
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'),
				include: path.join(__dirname, 'src/css')
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
				include: path.join(__dirname, 'src/css')
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!less'),
				include: path.join(__dirname, 'src/css')
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus'),
				include: path.join(__dirname, 'src/css')
			},
			{
				test: /\.png|jpe?g|gif$/,
				loader: "url-loader?limit=1&name=img/[hash].[ext]",
				include: path.join(__dirname, 'src/img')
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx'], // 自动扩展文件后缀名,引用的时候不需要加后缀了
		alias: {
			js: path.join(__dirname, "src/js") // 别名定义
		}
	},
	postcss: function() {
		return [
			require('postcss-original-path'),
			require('postcss-assets')({
				loadPaths: ['./src/img/'],
				relative: true
			}),
			require('postcss-cssnext')({
				browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'not ie <= 8', 'Android >= 4.0', 'iOS >= 7']
			}),
			require('postcss-sprites')({
				stylesheetPath: './src/css',
				spritePath: './src/img/sprite.png',
				outputDimensions: true,
				skipPrefix: true,
				filterBy: function(img) {
					return /\/sp\-/.test(img.url);
				},
				groupBy: function(img) {
					var match = img.url.match(/\/(sp\-[^\/]+)\//);
					return match ? match[1] : null;
				}
			})
		];
	}
};

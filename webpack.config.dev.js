var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'eventsource-polyfill', // necessary for hot reloading with IE
		'webpack-hot-middleware/client',
		'./src/index'
	],
	output: {
		path: path.join( __dirname, 'static' ),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	resolve: {
		extensions: [ '', '.js', '.jsx', '.json' ],
		alias: {
			'config': path.resolve( __dirname, 'config/default' ),
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [ {
			test: /\.jsx?/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015']
			},
			include: path.join( __dirname, 'src' )
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.scss$/,
			loader: 'style!css!sass'
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loader: 'file'
		} ]
	}
};

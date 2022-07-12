const path = require('path');

module.exports = {
	entry: './src/index.ts',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				type: 'asset',
			}
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'scripts/bundle.js',
		assetModuleFilename: 'images/[name][ext]',
		path: path.resolve(__dirname, 'dist')
	},
};
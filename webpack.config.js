//require("url?limit=20000!app/img/WallpaperPatrickGabrielli.jpg");
//require("url?limit=20000!app/img/roelverbuntlogogroot.png");

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validator = require('webpack-validator');

const NpmInstallPlugin = require('npm-install-webpack-plugin');
const parts = require('./lib/parts');


const TARGET = process.env.npm_lifecycle_event;
const root = __dirname;

const PATHS = {
   react: path.join(root, 'node_modules/react/dist/react.min.js'),
	app: path.join(root, 'app'), 
	style: [
		path.join(root, 'node_modules/purecss'),
		path.join(root, 'app/main.css'),
	], 
	images: path.join(root, 'app/img'),
	build: path.join(root, 'build')
};

const common = {
	// Entry accepts a path or an object of entries. // We'll be using the latter form given it's
	// convenient with more complex configurations. 
	entry: {
		style: PATHS.style,
		app: PATHS.app
	},
	output: {
   	path: PATHS.build,
      filename: '[name].[hash].js',
      // This is used for require.ensure. The setup
      // will work without but this is useful to set.
      chunkFilename: '[hash].js'
   }, 
   plugins: [
		new HtmlWebpackPlugin({ title: 'Webpack demo' }) 
	],
	module: {
     loaders: [
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=15000'}
      //  { test: /\.(png|jpg)$/, loader: 'file-loader'}
     ]
   }
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
  case 'stats':
    config = merge(
    	common,
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
		),
      parts.extractBundle({
        name: 'vendor',
        entries: ['react']
		}),
      parts.clean(PATHS.build),
      parts.minify(),
		parts.extractCSS(PATHS.style),
		parts.purifyCSS([PATHS.app]) 
	 );
    break;
  default:
    config = merge(
    	common, 
    	parts.sourceMapDevTool(),
    	parts.setupCSS(PATHS.style),
    	parts.devServer({
			// Customize host/port here if needed
			host: process.env.HOST,
			port: process.env.PORT   		
    	})
    );
}
module.exports = validator(config);

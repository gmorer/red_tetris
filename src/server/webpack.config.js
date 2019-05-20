const path = require('path');
const fs = require('fs');


let nodeModules = {};

fs.readdirSync('node_modules')
  .filter(x => x !== '.bin')
  .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

module.exports = {
	entry: "./index.js",
	target: "node",
	mode: "production",
	output: {
		path: path.join(__dirname, "build"),
		filename: "server.js"
	},
	externals: nodeModules
};
var WebpackDevServer = require("webpack-dev-server");
var config = require("./config/webpack.config");
var webpack = require("webpack");
var pkg = require('./package.json');

var port = pkg.config.devPort;
var host = pkg.config.devHost;
var server = new WebpackDevServer(webpack(config), config.devServer);

server.listen(port, host, function() {

});
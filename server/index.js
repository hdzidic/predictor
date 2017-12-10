require("babel-core/register");

const webserver = require('./core/webserver');
webserver.serve();

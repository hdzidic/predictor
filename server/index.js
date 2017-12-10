require("babel-core/register");

const webserver = require('./core/webserver');

const database = require('./db/database');

database.connect();
database.migrate();
webserver.serve();

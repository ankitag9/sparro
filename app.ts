///<reference path='./_references.d.ts'/>
import _                                            = require('underscore');
import express                                      = require('express');
import https                                        = require('https');
import log4js                                       = require('log4js');
import fs                                           = require('fs');
import appInit                                      = require('./appInit');
import Config                                       = require('./common/Config');

var pjson = require('./package.json');

log4js.configure('/var/sparro/config/log4js.json');
//Config.set(Config.VERSION, pjson['version']);

//new Coral.MysqlDelegate(Config.get(Config.DATABASE_HOST), Config.get(Config.DATABASE_NAME),
  //  Config.get(Config.DATABASE_USER), Config.get(Config.DATABASE_PASS), Config.get(Config.DATABASE_SOCKET));

/* Underscore settings and helpers */
_.templateSettings = {
    evaluate: /\{\[([\s\S]+?)\]\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g
};

_.mixin(appInit.helpers);
_.extend(_, appInit.helpers);

if (Config.get(Config.ENABLE_HTTP))
{
    var app:express.Application = express();
    appInit.initialise(app);

    app.set('port', Config.get(Config.DASHBOARD_HTTP_PORT));
    app.listen(app.get('port'), serverStartupAction);

    log4js.getDefaultLogger().debug("Sparro started on port %d in %s mode", app.get('port'), app.settings.env);
}

if (Config.get(Config.ENABLE_HTTPS))
{
    var secureApp = express();
    appInit.initialise(secureApp);

    var credentials = {
        key: fs.readFileSync(Config.get(Config.SSL_KEY)),
        cert: fs.readFileSync(Config.get(Config.SSL_CERT))
    };

    https.createServer(credentials, secureApp).listen(Config.get(Config.DASHBOARD_HTTPS_PORT), serverStartupAction);

    log4js.getDefaultLogger().debug("Sparro started on port %d in %s mode", Config.get(Config.DASHBOARD_HTTPS_PORT),
        secureApp.settings.env);
}

function serverStartupAction()
{
}
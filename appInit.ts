///<reference path='./_references.d.ts'/>
import _                                            = require('underscore');
import express                                      = require('express');
import connect_flash                                = require("connect-flash");
import path                                         = require('path');
import passport                                     = require('passport');
import moment                                       = require('moment');
import api                                          = require('./api/index');
import Config                                       = require('./common/Config');
var connect                                         = require('connect');
var session                                         = require('express-session');
var RedisStore                                      = require('connect-redis')(connect);

class appInit
{
    // View helpers
    static helpers:Object =
    {
        moment: moment,

        currentYear: moment().format('YYYY')
    };

    static initialise(app:express.Application)
    {
        app.use(
            function (req:express.Request, res:express.Response, next:Function)
            {
                // This middleware applies to all urls except
                // 1. APIs (which start with "/rest")
                // 2. Static content (which start with "/js" or "/css" or "/img")
                var excludeRegex:RegExp = /^\/(rest|lib|css|js|images|img|fonts|static)/;

                if (req.path.match(excludeRegex))//Coral.Utils.isNullOrEmpty(req.path.match(excludeRegex))
                {
                    _.extend(res.locals, appInit.helpers);
                    res.locals.path = req.path;
                }

                next();
            }
        );

        // all environments
        app.use(express.compress());
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'jade');

        var oneDay:number = 86400000;
        app.use(express.static(path.join(__dirname, 'public'), {maxAge: oneDay}));

        app.use(express.json());
        app.use(express.urlencoded());

        app.use(express.methodOverride());
        //app.use(RequestHandler.parseRequest);
        app.use(express.cookieParser());

        /*app.use(session({
            secret: 'captain',
            cookie: {maxAge: Config.get(Config.SESSION_EXPIRY)},
            store: new RedisStore({
                host: Config.get(Config.REDIS_HOST),
                port: Config.get(Config.REDIS_SESSION_PORT)
            }),
            rolling: true,
            saveUninitialized: true,
            resave: true
        }));*/

        app.use(passport.initialize());
        app.use(passport.session({}));
        app.use(connect_flash());

        // APIs and Route endpoints
        api(app);

        /* Error Pages */
        app.use(function (req:express.Request, res:express.Response, next:Function)
        {
            res.status(404);

            // respond with html page
            if (req.accepts('html'))
            {
                res.render('404', { url: req.url });
                return;
            }

            // respond with json
            if (req.accepts('json'))
            {
                res.send({ error: 'Not found' });
                return;
            }

            // default to plain-text. send()
            res.type('txt').send('Not found');
        });

        app.use(function (err:any, req:express.Request, res:express.Response, next:Function)
        {
            var isAjax:Boolean = req.get('content-type') && req.get('content-type').indexOf('application/json') != -1;
            if (isAjax)
                return res.send(500, err.message);

            // we may use properties of the error object
            // here and next(err) appropriately, or if
            // we possibly recovered from the error, simply next().
            res.status(err.status || 500);
            res.render('500', { error: err });
        });


        app.configure('production', function ()
        {
            app.enable('view cache');
        });

    }
}
export = appInit
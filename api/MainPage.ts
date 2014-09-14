import express                                              = require('express');

class MainPage
{
    constructor(app)
    {
        app.get('/', function(req:express.Request, res:express.Response)
        {
            res.render('index');
        });
    }
}
export = MainPage
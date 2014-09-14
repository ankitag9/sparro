///<reference path='../_references.d.ts'/>
import nconf        = require("nconf");

class Config
{
    static PORT:string                                  = 'port';
    static DATABASE_HOST:string                         = 'database.host';
    static DATABASE_NAME:string                         = 'database.name';
    static DATABASE_USER:string                         = 'database.user';
    static DATABASE_PASS:string                         = 'database.pass';
    static REF_DATABASE_NAME:string                     = 'ref.database.name';
    static DATABASE_SOCKET:string                       = 'database.socket';
    static UPLOAD_PATH:string                           = 'upload.path';

    static ENABLE_HTTP:string                           = 'enable.http';
    static ENABLE_HTTPS:string                          = 'enable.https';

    static DASHBOARD_URI:string                         = 'Dashboard.uri';
    static DASHBOARD_HTTP_PORT:string                   = 'Dashboard.httpPort';
    static DASHBOARD_HTTPS_PORT:string                  = 'Dashboard.httpsPort';

    static SSL_KEY:string                               = 'ssl.key';
    static SSL_CERT:string                              = 'ssl.cert';

    private static ctor = (() =>
    {
        nconf.file({file: "/var/sparro/config/config.json"});
    })();

    /* Getters */
    static get(key:string):any
    {
        return nconf.get(key);
    }

}
export = Config
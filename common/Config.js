///<reference path='../_references.d.ts'/>
var nconf = require("nconf");

var Config = (function () {
    function Config() {
    }
    /* Getters */
    Config.get = function (key) {
        return nconf.get(key);
    };
    Config.PORT = 'port';
    Config.DATABASE_HOST = 'database.host';
    Config.DATABASE_NAME = 'database.name';
    Config.DATABASE_USER = 'database.user';
    Config.DATABASE_PASS = 'database.pass';
    Config.REF_DATABASE_NAME = 'ref.database.name';
    Config.DATABASE_SOCKET = 'database.socket';
    Config.UPLOAD_PATH = 'upload.path';

    Config.ENABLE_HTTP = 'enable.http';
    Config.ENABLE_HTTPS = 'enable.https';

    Config.DASHBOARD_URI = 'Dashboard.uri';
    Config.DASHBOARD_HTTP_PORT = 'Dashboard.httpPort';
    Config.DASHBOARD_HTTPS_PORT = 'Dashboard.httpsPort';

    Config.SSL_KEY = 'ssl.key';
    Config.SSL_CERT = 'ssl.cert';

    Config.ctor = (function () {
        nconf.file({ file: "/var/sparro/config/config.json" });
    })();
    return Config;
})();
module.exports = Config;
//# sourceMappingURL=Config.js.map

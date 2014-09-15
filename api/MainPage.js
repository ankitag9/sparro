var MainPage = (function () {
    function MainPage(app) {
        app.get('/', function (req, res) {
            res.render('index');
        });
    }
    return MainPage;
})();
module.exports = MainPage;
//# sourceMappingURL=MainPage.js.map

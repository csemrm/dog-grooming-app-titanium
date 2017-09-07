var restapi = require('restapi');
var indicator = require("./indicator");
indicator_win = new indicator();

function onLoad(e) {
    indicator_win.open();
    restapi.getConfig(function(data) {
        Ti.API.info('get config' + JSON.stringify(data));
        indicator_win.close();
        var loginWin = $.getView('auth/login', data);
        $.index.add(loginWin);
    }, function() {
        var noapi = $.getView('error/noapi', {});
        $.index.add(noapi);
        indicator_win.close();
    });
}

$.index.open();

var restapi = require('restapi');
var indicator = require("./indicator");
indicator_win = new indicator();

function onLoad(e) {
    indicator_win.open();
    restapi.getConfig(function(data) {
       Ti.App.Properties.setObject('config', data);
        Ti.API.info('get config' + JSON.stringify(data));
        indicator_win.close();
        var loginWin = Alloy.createController('auth/login', data).getView();
        $.index.add(loginWin);
    }, function() {
        var noapi = Alloy.createController('error/noapi', {}).getView();
        $.index.add(noapi);
        indicator_win.close();
    });
}

$.index.open();

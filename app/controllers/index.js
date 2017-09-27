var restapi = require('restapi');
var indicator = require("indicator");
indicator_win = new indicator();

function onLoad(e) {
    indicator_win.open();

    restapi.getConfig(function(data) {
        Ti.App.Properties.setObject('config', data);
        Ti.API.info('get config' + JSON.stringify(data));
        indicator_win.close();
        var loginWin = Alloy.createController('auth/login', data).getView();
        $.index.add(loginWin);
        Ti.App.fireEvent('app:messagePush', {});
    }, function() {
        indicator_win.close();
        Alloy.createController('error/noapi', {}).getView().open();

    });
}

if (OS_ANDROID) {
    $.index.fbProxy = Alloy.Globals.Facebook.createActivityWorker({
        lifecycleContainer : $.index
    });
}

$.index.open();

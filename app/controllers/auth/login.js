// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var config = Ti.App.Properties.getObject('config', {});
var restapi = require('restapi');
var assets = require('assets');
var logoImg = config.images[0].path;

Ti.API.info('Alloy.CFG.assets.logoImg' + Alloy.CFG.assets + logoImg + 'config ' + JSON.stringify(config.images[0]));
$.logo.image = Alloy.CFG.assets + logoImg;

$.logo.addEventListener('load', function(e) {
    Ti.API.info('$.logo.image' + $.logo.image);
});

function openSignup() {
    var signup = Alloy.createController('auth/signup', {}).getView();

    signup.open();
}

function onSubmit() {
    var _data = {
        email : $.emailaddress.value,
        password : $.password.value
    };
    if (_data.email && _data.password) {
        indicator_win.open();
        restapi.login(_data, function(data) {
            indicator_win.close();
            if (data.error === true) {
                var param = {
                    buttonNames : ['Ok'],
                    message : data.message
                };
                assets.alertMsg(param);
            } else {
                Ti.App.Properties.setObject('user', data);
                Ti.API.info('get user' + JSON.stringify(data));

                var home = Alloy.createController('home', {}).getView();
                home.open();
            }
        }, function() {
            var noapi = Alloy.createController('error/noapi', {}).getView();
            $.index.add(noapi);
            indicator_win.close();
        });
    }
}

// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var config = Ti.App.Properties.getObject('config', {});
var restapi = require('/restapi');
var assets = require('/assets');
var logoImg = config.images[0].path;
var fb = Alloy.Globals.Facebook;
var measurement = require('alloy/measurement');
//Alloy.Globals.width
//Alloy.Globals.height

if (Alloy.Globals.height > 600) {
    $.logo.top = 100;
    $.logo.width = 160;
}
Ti.API.info('Alloy.CFG.assets.logoImg' + Alloy.CFG.assets + logoImg + 'config ' + JSON.stringify(config.images[0]));
$.logo.image = Alloy.CFG.assets + logoImg;

fb.permissions = ["public_profile", "email", "user_friends"];
// e.g. ['email']
fb.initialize();
fb.logout();
var userlogin = Ti.App.Properties.getObject('userlogin', {
    email : '',
    password : ''
});

$.emailaddress.value = userlogin.email;
$.password.value = userlogin.password;

$.logo.addEventListener('load', function(e) {
    Ti.API.info('$.logo.image' + $.logo.image);
});

function openSignup() {
    var signup = Alloy.createController('auth/signup', {}).getView();
    signup.open();
}

//2889474
function loginWithFB() {

    fb.authorize();
}

function loginWithTW() {
    var social = require('alloy/social').create({
        consumerSecret : Alloy.CFG.consumerSecret,
        consumerKey : Alloy.CFG.consumerKey
    });
    /*
     social.authorize(function(data) {
     Ti.API.info('social data ' + JSON.stringify(data));
     });
     */
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
                Ti.App.Properties.setObject('userlogin', _data);
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

fb.addEventListener('login', function(e) {
    if (e.success) {
        Ti.API.info('login from uid: ' + e.uid + ', name: ' + JSON.parse(e.data).name);
        var user = JSON.parse(e.data);
        user.id = e.uid;
        user.logintype = 'facebook';
        Ti.API.info('Logged In = ' + (e.data));
        Ti.App.Properties.setObject('user', user);
        var home = Alloy.createController('auth/signuppetadd', {}).getView();
        home.open();
    } else if (e.cancelled) {
        Ti.API.info('cancelled');
    } else {
        alert(e.error);
    }
});

// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var config = Ti.App.Properties.getObject('config', {});
var logoImg = config.images[0].path;

Ti.API.info('Alloy.CFG.assets.logoImg' + Alloy.CFG.assets.logoImg + 'config ' + JSON.stringify(config.images[0]));
$.logo.image = Alloy.CFG.assets + logoImg;

$.logo.addEventListener('load', function(e) {
    Ti.API.info('$.logo.image' + $.logo.image);
});

function openSignup() {
    var signup = Alloy.createController('auth/signup', {}).getView();

    signup.open();
}

function onSubmit() {

}

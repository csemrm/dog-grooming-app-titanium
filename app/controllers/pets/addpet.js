// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var config = Ti.App.Properties.getObject('config', {});
var logoImg = config.images[0].path;
$.logo.image = Alloy.CFG.assets + logoImg;

function onSubmit(e) {

}

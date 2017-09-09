// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var radio = require('myTiRadioButton');

var config = Ti.App.Properties.getObject('config', {});
var logoImg = config.images[0].path;
$.logo.image = Alloy.CFG.assets + logoImg;

$.logo.addEventListener('load', function(e) {
    Ti.API.info('$.logo.image' + $.logo.image);
});

var subscribebtn = radio.createCheckBoxButtonGroup({
    groupId : 1,
    width : 240,
    height : 40,
    left : 2,
    top : 0,
    layout : 'horizontal',
    radioItemsValue : ['Subscribe to newsletter'],
    radioItemsPadding : 5,
    radioItemsBackgroundSelectedImage : '/images/checkbox_tick.png',
    radioItemsBackgroundImage : '/images/checkbox.png',
    radioItemsWidth : 16,
    radioItemsHeight : 16,
    labelColor : Alloy.CFG.apptheme.input_text_color,
});
$.subsbox.add(subscribebtn);

function goNext(e) {
    var addpet = Alloy.createController('auth/signuppetadd', {}).getView();
    addpet.open();
}

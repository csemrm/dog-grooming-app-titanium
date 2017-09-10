// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var restapi = require('/restapi');
var assets = require('/assets');
var indicator = require("/indicator");
var radio = require('/myTiRadioButton');
indicator_win = new indicator();

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
var gender_opts = radio.createRadioButtonGroup({
    groupId : 1,
    width : Ti.UI.SIZE,
    height : Ti.UI.SIZE,
    left : 10,
    top : 10,
    layout : 'horizontal',
    radioItemsValue : ['M', 'F'],
    radioItemsPadding : 5,
    radioItemsBackgroundSelectedImage : '/images/radio_btn1.png',
    radioItemsBackgroundImage : '/images/radio_btn2.png',
    radioItemsWidth : 16,
    radioItemsHeight : Ti.UI.SIZE,
    labelColor : Alloy.CFG.apptheme.input_text_color,
});
$.gender.add(gender_opts);
function goNext(e) {
    var addpet = Alloy.createController('auth/signuppetadd', {}).getView();
    addpet.open();
}

function openPicker() {

    if (OS_IOS) {
        var picker_view = assets.timeanddate_picker('date', $.dob, $.signup);
        $.signup.add(picker_view);
    } else {
        assets.androidPicker('date', $.dob);
    }

}

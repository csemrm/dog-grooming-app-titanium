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

var gender_opts = radio.createRadioButtonGroup({
    groupId : 1,
    width : Ti.UI.SIZE,
    height : Ti.UI.SIZE,
    left : 10,
    top : 10,
    layout : 'horizontal',
    radioItemsValue : ['Male', 'Female'],
    radioItemsPadding : 5,
    radioItemsBackgroundSelectedImage : '/images/radio_btn1.png',
    radioItemsBackgroundImage : '/images/radio_btn2.png',
    radioItemsWidth : 16,
    radioItemsHeight : Ti.UI.SIZE,
    labelColor : Alloy.CFG.apptheme.input_text_color,
});
$.genderbox.add(gender_opts);

var animaltype_opts = radio.createRadioButtonGroup({
    groupId : 1,
    width : Ti.UI.SIZE,
    height : Ti.UI.SIZE,
    left : 10,
    top : 10,
    layout : 'horizontal',
    radioItemsValue : ['Dog', 'Cat'],
    radioItemsPadding : 5,
    radioItemsBackgroundSelectedImage : '/images/radio_btn1.png',
    radioItemsBackgroundImage : '/images/radio_btn2.png',
    radioItemsWidth : 16,
    radioItemsHeight : Ti.UI.SIZE,
    labelColor : Alloy.CFG.apptheme.input_text_color,
});
$.animaltypebox.add(animaltype_opts);
function PhotoOptionDialog() {
    assets.PhotoOptionDialog($.dogpic);
}

function onSubmit(e) {

}

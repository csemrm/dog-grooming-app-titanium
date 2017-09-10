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
var user = Ti.App.Properties.getObject('user', {});
var appuser_id = user.id;
var gender_opts = radio.createRadioButtonGroup({
    groupId : 1,
    width : 180,
    height : 40,
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
    width : 180,
    height : 40,
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
    var petname = $.petname.value;
    var weight = $.weight.value;
    var bread = $.bread.value;
    var animaltype = Array.isArray(animaltype_opts.selectedValue) ? animaltype_opts.selectedValue[0] : '';
    var gender = Array.isArray(gender_opts.selectedValue) ? gender_opts.selectedValue[0] : '';

    var _data = {
        name : petname,
        weight : weight,
        type : animaltype,
        gender : gender,
        weight : weight,
        bread : bread,
        appuser_id : appuser_id,
        image : $.dogpic.toImage()
    };

    Ti.API.info('_data  ' + JSON.stringify(_data));
    if (petname && weight && type && gender && weight && bread && appuser_id) {

        restapi.addpet(_data, function(data) {
            if (data.error === true) {
                var param = {
                    buttonNames : ['Ok'],
                    message : data.message,
                    callback : function(e) {
                    }
                };
                assets.alertMsg(param);
            } else {
                Ti.API.info('get config' + JSON.stringify(data));
                indicator_win.close();
                var addpet = Alloy.createController('home', {}).getView();
                addpet.open();
            }
        }, function() {
            indicator_win.close();
            Alloy.createController('error/noapi', {}).getView().open();

        });

    } else {
        var param = {
            buttonNames : ['Ok'],
            message : "All Feild required",
            callback : function(e) {
            }
        };
        assets.alertMsg(param);
    }
}

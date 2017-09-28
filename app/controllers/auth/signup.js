// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var restapi = require('/restapi');
var assets = require('/assets');
var indicator = require("/indicator");
var radio = require('/myTiRadioButton');
indicator_win = new indicator();
var moment = require('alloy/moment');
var config = Ti.App.Properties.getObject('config', {});
var logoImg = config.images[0].path;
$.logo.image = Alloy.CFG.assets + logoImg;

$.logo.addEventListener('load', function(e) {
    Ti.API.info('$.logo.image' + $.logo.image);
});
inti();

function MLTextAreaFocus(e) {
    if (e.source.value == "Your Address") {
        e.source.value = "";
        e.source.color = "#000";
    }
};

function MLTextAreaBlur(e) {
    if (e.source.value == '') {
        e.source.value = "Your Address";
        e.source.color = "#999";
    }
};

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
    width : '130dp',
    height : 50,
    left : 10,
    top : 0,
    layout : 'horizontal',
    radioItemsValue : ['M', 'F'],
    radioItemsPadding : 5,
    radioItemsBackgroundSelectedImage : '/images/radio_btn1.png',
    radioItemsBackgroundImage : '/images/radio_btn2.png',
    radioItemsWidth : 16,
    radioItemsHeight : 16,
    labelColor : Alloy.CFG.apptheme.input_text_color,
});
$.gender.add(gender_opts);
function goNext(e) {

    var name = $.name.value;
    var phone = $.phone.value;
    var emailaddress = $.emailaddress.value;
    var password = $.password.value;
    var cpassword = $.cpassword.value;

    var dob = $.dob.text || '';
    var gender = Array.isArray(gender_opts.selectedValue) ? gender_opts.selectedValue[0] : '';
    var address = $.address.value;
    var city = $.city.value;
    var state = $.state.value;
    var subscribe = (subscribebtn.selectedValue).length || false;

    var _data = {
        username : name,
        phone : phone,
        email : emailaddress,
        password : password,
        dob : dob,
        gender : gender,
        address : address,
        city : city,
        state : state,
        subscribe : subscribe
    };

    Ti.API.info('_data  ' + JSON.stringify(_data));
    if (name && phone && emailaddress && password && dob && gender && address && city && state) {
        if ((password.length > 3) && (password === cpassword)) {

            restapi.register(_data, function(data) {
                if (data.error === true) {
                    var param = {
                        buttonNames : ['Ok'],
                        message : data.message,
                        callback : function(e) {
                        }
                    };
                    assets.alertMsg(param);
                } else {
                    Ti.App.Properties.setObject('user', data.user);
                    Ti.API.info('get config' + JSON.stringify(data));
                    indicator_win.close();
                    var addpet = Alloy.createController('auth/signuppetadd', {}).getView();
                    addpet.open();
                }
            }, function() {
                indicator_win.close();
                Alloy.createController('error/noapi', {}).getView().open();

            });
        } else {
            var param = {
                buttonNames : ['Ok'],
                message : "Password Missmatch",
                callback : function(e) {
                }
            };
            assets.alertMsg(param);
        }
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

function openPicker() {
    var value = new moment();
    if (OS_IOS) {
        var picker_view = assets.timeanddate_picker('date', $.dob, $.signup);
        $.signup.add(picker_view);
    } else {
        assets.androidPicker('date', $.dob, value);
    }

}

function inti() {
    $.navigationBar.setBackgroundColor(Alloy.CFG.apptheme.top_nev_bar_bg);

    $.navigationBar.showBack(function(_event) {
        Ti.API.info('_event ' + JSON.stringify(_event));
        $.signup.close();
    });
}

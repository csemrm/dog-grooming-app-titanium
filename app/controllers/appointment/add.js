// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//
//  add.js
//  WoodlesApp
//
//  Created by Mostafizur Rahman on 2017-09-09.
//  Copyright 2017 Mostafizur Rahman. All rights reserved.
//

// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var restapi = require('/restapi');
var assets = require('/assets');
var radio = require('/myTiRadioButton');
var indicator = require("/indicator");
var user = Ti.App.Properties.getObject('user', {});
var config = Ti.App.Properties.getObject('config', {});
var promo_id = args.promo_id || '';

var appuser_id = user.id;
indicator_win = new indicator();
var dogId = args.dogId || '';
var gender_opts = radio.createCheckBoxButtonGroup({
    groupId : 1,
    width : 150,
    height : 150,
    left : 2,
    top : 15,
    layout : 'vertical',
    radioItemsValue : ['Dog Walk', 'Wash', 'Hair Cut', 'Bail Trimming', 'Flea Treatment', 'Over night vacation'],
    radioItemsPadding : 5,
    radioItemsBackgroundSelectedImage : '/images/checkbox_tick.png',
    radioItemsBackgroundImage : '/images/checkbox.png',
    radioItemsWidth : 16,
    radioItemsHeight : 16,
    labelColor : Alloy.CFG.apptheme.input_text_color,
});
$.genderbox.add(gender_opts);

function selectpet(e) {
    Ti.API.info('selectpet ' + JSON.stringify(e));

    var views = $.dogcontainner.children;
    for (var i = 0,
        j = views.length; i < j; i++) {
        $.dogcontainner.children[i].borderColor = Alloy.CFG.apptheme.color_white;
        Ti.API.info('e.source.id' + JSON.stringify($.dogcontainner.children[i]));
    };

    if (e.source.id === 'dogdisply') {
        e.source.borderColor = Alloy.CFG.apptheme.top_nev_bar_bg;
        dogId = e.source.dog.id;
        Ti.API.info('e.source.id' + dogId);
    }
}

function onSubmit(e) {
    var date = $.date.value;
    var time = $.time.value;
    var note = (gender_opts.selectedValue).toString();

    var _data = {
        resv_date : date,
        resv_time : time,
        note : note,
        user_id : appuser_id,
        promo_id : promo_id || '',
        dog_id : dogId,
        user_email : user.email || '',
        user_phone_no : user.phone || '',
        user_name : user.username || '',
        status_id : 1
    };

    Ti.API.info('_data  ' + JSON.stringify(_data));
    if (dogId && date && time && note) {

        restapi.reservations(_data, function(data) {
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
                var param = {
                    buttonNames : ['Ok'],
                    message : data.message,
                    callback : function(e) {
                        if (promo_id) {
                            args.win.close();
                        }
                    }
                };
                assets.alertMsg(param);
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

function loaddogs(user) {
    var url = user.id;
    indicator_win.open();
    restapi.loaddogs(url, function(e) {
        indicator_win.close();
        Ti.API.info('e' + JSON.stringify(e));
        if (e.success === true) {
            var dogs = e.dogs;
            displayloaddogs(dogs);
        }
    }, function() {
        indicator_win.close();
        var noapi = Alloy.createController('error/noapi', {}).getView().open();
    });
}

function displayloaddogs(dogs) {
    $.dogcontainner.removeAllChildren();
    for (var i = 0,
        j = dogs.length; i < j; i++) {

        var dog = dogs[i];
        var dogdisplay = Alloy.createController('pets/dog', {
            dog : dog,
            dogId : dogId,
            isFev : false,
            isEditable : false
        }).getView();
        $.dogcontainner.add(dogdisplay);
    }

}

loaddogs(user);

function openTimePicker() {

    if (OS_IOS) {
        var picker_view = assets.timeanddate_picker('time', $.time, $.add);
        $.add.add(picker_view);
    } else {
        assets.androidPicker('time', $.time);
    }

}

function openDatePicker() {

    if (OS_IOS) {
        var picker_view = assets.timeanddate_picker('date', $.date, $.add);
        $.add.add(picker_view);
    } else {
         assets.androidPicker('date', $.date);
    }

}


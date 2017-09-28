//
//  notificationdisplay.js
//  WoodlesApp
//
//  Created by Mostafizur Rahman on 2017-09-27.
//  Copyright 2017 Mostafizur Rahman. All rights reserved.
//

var args = $.args;
var restapi = require('/restapi');
var assets = require('/assets');
var user = Ti.App.Properties.getObject('user', {});

var data = args.data || {};
var extradata = JSON.parse(data.extradata) || {};
var type = extradata.type || '';
Ti.API.info('type ' + type + 'notificationdisplay data images ' + JSON.stringify(extradata));

if (type === 'promo') {
    var promo = extradata.feed;

    var images = [];
    for (var i = 0,
        j = promo.images.length; i < j; i++) {
        images.push(Alloy.CFG.assets + promo.images[i].path);
    };
    $.imgdog.images = images;
    $.imgdog.start();
    Ti.API.info('images ' + JSON.stringify(images));
    $.promodesc.text = extradata.feed.description || '';
} else if (type === 'dog') {
    var reservation = extradata.reservation;

    var images = [];
    for (var i = 0,
        j = reservation.images.length; i < j; i++) {
        images.push(Alloy.CFG.assets + reservation.images[i].path);
    };
    $.imgdog.images = images;
    $.imgdog.start();
    Ti.API.info('images ' + JSON.stringify(images));
    $.promodesc.text = data.payload || '';
}
function gotoScreen() {
    $.notificationdisplay.close();
    if (type === 'promo') {
        Ti.App.fireEvent('reload:lsit', {
            source : {
                id : 3,
                ref : 'specials',
            }
        });
    } else if (type === 'dog') {
        Ti.App.fireEvent('reload:lsit', {
            source : {
                id : 0,
                ref : 'home',
            }
        });
    } else if (type === 'app.pending') {

    }
}

if (type === 'app.confirm' || type === 'app.pending') {
    var gender_opts = radio.createCheckBoxButtonGroup({
        groupId : 1,
        width : 150,
        height : 120,
        left : 2,
        top : 15,
        layout : 'vertical',
        radioItemsValue : services,
        radioItemsPadding : 5,
        radioItemsBackgroundSelectedImage : '/images/checkbox_tick.png',
        radioItemsBackgroundImage : '/images/checkbox.png',
        radioItemsWidth : 12,
        radioItemsHeight : 12,
        labelColor : Alloy.CFG.apptheme.input_text_color,
    });
    $.dogcontainner.add(gender_opts);
}

function onSubmit(e) {
    var _data = {
        id : 2,
        status_id : 3
    };

    Ti.API.info('_data  ' + JSON.stringify(_data));

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
            var param = {
                buttonNames : ['Ok'],
                message : data.message,
                callback : function(e) {

                }
            };
            assets.alertMsg(param);
        }
    }, function() {
        indicator_win.close();
        Alloy.createController('error/noapi', {}).getView().open();

    });

}
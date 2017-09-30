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
var radio = require('/myTiRadioButton');
var user = Ti.App.Properties.getObject('user', {});
var config = Ti.App.Properties.getObject('config', {});
var services = config.services;
var data = args.data || {};
var extradata = JSON.parse(data.extradata) || {};
var type = extradata.type || '';
var reservation_id = 0;
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
    $.appointments.title = 'Okey ';
} else if (type === 'dog') {
    $.appointments.title = 'Ready for Pickup ';
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
    $.direction.visible = true;
    $.direction.height = 50;
} else if (type === 'app.confirm' || type === 'app.pending') {

    $.appointments.title = (type === 'app.pending') ? 'Click to Confirm' : 'Okey';
    var reservation = extradata.reservation;
    reservation_id = reservation.id;
    var images = [];
    for (var i = 0,
        j = reservation.images.length; i < j; i++) {
        images.push(Alloy.CFG.assets + reservation.images[i].path);
    };
    $.imgdog.images = images;
    $.imgdog.start();
    Ti.API.info('images ' + JSON.stringify(images));
    $.promodesc.text = data.payload || '';
    var note = reservation.note;
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
        selectedValue : note.split(',')
    });
    $.serviceid.add(gender_opts);
    if (type === 'app.confirm') {
        $.direction.visible = true;
        $.direction.height = 50;
    }
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
        onSubmit();
    } else if (type === 'app.confirm') {

    }
}

function onSubmit(e) {
    var _data = {
        id : reservation_id,
        status_id : 3
    };

    Ti.API.info('_data  ' + JSON.stringify(_data));

    restapi.reservations_update(_data, function(data) {
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
        Alloy.createController('error/noapi', {}).getView().open();

    });

}

function gotoDirection(e) {
    $.notificationdisplay.close();
    var contact_address = config.contact_address;
    Ti.Geolocation.forwardGeocoder(contact_address, function(e) {

        if (e.success) {
            Ti.Platform.openURL("http://maps.google.com/maps?q=" + e.latitude + "," + e.longitude);
        } else {
            Ti.Platform.openURL("http://maps.google.com/maps?q=" + contact_address);
        }

    });

}

Ti.App.Properties.setBool('clearpush', false);
function clearpush() {
    Ti.App.Properties.setBool('clearpush', true);
}

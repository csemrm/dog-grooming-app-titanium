//
//  details.js
//  WoodlesApp
//
//  Created by Mostafizur Rahman on 2017-09-09.
//  Copyright 2017 Mostafizur Rahman. All rights reserved.
//
var args = $.args;
var restapi = require('/restapi');
var assets = require('/assets');
var user = Ti.App.Properties.getObject('user', {});

var data = args.data || {};
var extradata = data.extradata || {};
var type = extradata.type || '';
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
    }
}

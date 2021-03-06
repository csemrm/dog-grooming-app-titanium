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
var promo = args.promo || {};
Ti.API.info('promo' + JSON.stringify(promo));
var images = [];
for (var i = 0,
    j = promo.images.length; i < j; i++) {
    images.push(Alloy.CFG.assets + promo.images[i].path);
};
$.imgdog.images = images;
$.imgdog.start();
function setAppointments() {
    Ti.App.fireEvent('reload:lsit', {
        source : {
            id : 1,
            promo_id : promo.id
        }
    });
}

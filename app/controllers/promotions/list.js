//
//  list.js
//  WoodlesApp
//
//  Created by Mostafizur Rahman on 2017-09-08.
//  Copyright 2017 Mostafizur Rahman. All rights reserved.
//

var args = $.args;
var restapi = require('/restapi');
var assets = require('/assets');
var indicator = require("/indicator");

var user = Ti.App.Properties.getObject('user', {});
indicator_win = new indicator();

function loadpromos() {
    indicator_win.open();
    restapi.loadpromos(function(e) {
        indicator_win.close();
        Ti.API.info('e' + JSON.stringify(e));
        if (e.success === true) {
            var promos = e.promos;
            displayloadpromos(promos);
        }
    }, function() {
        indicator_win.close();
        var noapi = Alloy.createController('error/noapi', {}).getView().open();
    });
}

function displayloadpromos(promos) {
    $.dogcontainner.removeAllChildren();
    for (var i = 0,
        j = promos.length; i < j; i++) {

        var promo = promos[i];
        var detailsWin = Alloy.createController('promotions/details', {
            promo : promo,
            isFev : false,
            isEditable : false
        }).getView();
        $.dogcontainner.add(detailsWin);
    }
}

loadpromos();

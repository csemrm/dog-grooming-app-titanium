//
//  list.js
//  WoodlesApp
//
//  Created by Mostafizur Rahman on 2017-09-08.
//  Copyright 2017 Mostafizur Rahman. All rights reserved.
//

var args = $.args;
var restapi = require('restapi');
var assets = require('assets');
var indicator = require("./indicator");
var user = Ti.App.Properties.getObject('user', {});
indicator_win = new indicator();

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
        var dogdisplay = Alloy.createController('pets/dogdisplay', {
            dog : dog,
            isFev : false,
            isEditable : false
        }).getView();
        $.dogcontainner.add(dogdisplay);
    }
}

loaddogs(user);

function opnePetDetail(e) {
    if (e.source.id === 'dogdisply') {
        var dog = e.source.dog;
        var petdetailWin = Alloy.createController('pets/petdetail', {
            dog : dog,
            isFev : false,
            isEditable : false
        }).getView();

        petdetailWin.open();
    }
}

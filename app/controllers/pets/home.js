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
var config = Ti.App.Properties.getObject('config', {});
var user = Ti.App.Properties.getObject('user', {});
var logoImg = config.images[0].path;
Ti.API.info('Alloy.CFG.assets.logoImg' + Alloy.CFG.assets + logoImg + 'config ' + JSON.stringify(config.images[0]));

indicator_win = new indicator();

//if (Alloy.Globals.height > 640) {
//$.promo.top = Alloy.Globals.height > 650 ? (Alloy.Globals.height - 640) : 10;
//}
var logoImg = config.images[0].path;
$.logo.image = Alloy.CFG.assets + logoImg;

$.logo.addEventListener('load', function(e) {
    Ti.API.info('$.logo.image' + $.logo.image);
});
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
    if (promos.length) {
        var promo = promos[0];
        Ti.API.info('promo promo' + JSON.stringify(promo));
        var images = [];
        for (var i = 0,
            j = promo.images.length; i < j; i++) {
            images.push(Alloy.CFG.assets + promo.images[i].path);
        };
        $.imgdog.images = images;
        $.imgdog.start();
        $.promodesc.text = promo.description;
    } else {
        $.imgdog.image = Alloy.CFG.assets + logoImg;
        //$.imgdog.height = 200;
        $.promodesc.text = config.contact_address;
        $.promodesc.textAlign = Titanium.UI.TEXT_ALIGNMENT_CENTER;

    }
}

loadpromos();

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

        Ti.App.fireEvent('reload:lsit', {
            source : {
                id : 1,
                dog : e.source.dog,
                dogId : dogId
            }
        });
    }
}

function loaddogs(user) {
    var url = user.id;
    restapi.loaddogs(url, function(e) {
        Ti.API.info('e' + JSON.stringify(e));
        if (e.success === true) {
            var dogs = e.dogs;
            displayloaddogs(dogs);
        }
    }, function() {
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
            dogId : '',
            isFev : false,
            isEditable : false
        }).getView();
        $.dogcontainner.add(dogdisplay);
    }

}

loaddogs(user);

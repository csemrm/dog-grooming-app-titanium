// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//
//  petdetail.js
//  WoodlesApp
//
//  Created by Mostafizur Rahman on 2017-09-08.
//  Copyright 2017 Mostafizur Rahman. All rights reserved.
//

var args = $.args;
var restapi = require('/restapi');
var assets = require('/assets');
var user = Ti.App.Properties.getObject('user', {});
var dog = args.dog || {};
Ti.API.info('dog' + JSON.stringify(dog));
var images = [];

for (var i = 0,
    j = dog.images.length; i < j; i++) {
    images.push(Alloy.CFG.assets + dog.images[i].path);
};
$.imgdog.images = images;
$.imgdog.start();
$.dogname.text = dog.name || 'dog.name';

function inti() {
    $.navigationBar.setBackgroundColor(Alloy.CFG.apptheme.top_nev_bar_bg);

    $.navigationBar.showBack(function(_event) {
        $.petdetail.close();
    });

    $.navigationBar.showMyRight({
        icon : '/icons/share.png',
        _callback : function(_event) {
            var data = {
                status : dog.name,
                url : images[0],
                subject : dog.name,
                image : $.imgdog.toBlob(),
                view : $.mapContainner,
            };
            assets.shareTextWidget(data);
        }
    });

}

inti();

function setAppointments() {
    Alloy.createController('appointment/addWin', {
        dogId : dog.id
    }).getView().open();
}

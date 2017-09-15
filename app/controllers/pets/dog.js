// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//
//  dogdisplay.js
//  WoodlesApp
//
//  Created by Mostafizur Rahman on 2017-09-08.
//  Copyright 2017 Mostafizur Rahman. All rights reserved.
//

var args = $.args;
var dogId = args.dogId || '';
var dog = args.dog || {};
Ti.API.info('dog' + JSON.stringify(dog));

var images = [];
$.dogdisply.dog = dog;

if (dog.id === dogId) {
    $.dogdisply.borderColor = Alloy.CFG.apptheme.top_nev_bar_bg;
}
$.petname.text = dog.name || 'dog.name';
loaddog(dog);
function loaddog(dog) {
    var dogimages = dog.images || [];
    if (dogimages.length) {
        for (var i = 0,
            j = dogimages.length; i < j; i++) {
            images.push(Alloy.CFG.assets + dogimages[i].path);
        };
        $.imgdog.images = images;
        $.imgdog.start();
    } else if (dog.type === 'Dog') {
        $.imgdog.image = '/images/avators-dog.png';
    } else if (dog.type === 'Cat') {
        $.imgdog.image = '/images/avators-cat.png';
    }
}

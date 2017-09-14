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
for (var i = 0,
    j = dog.images.length; i < j; i++) {
    images.push(Alloy.CFG.assets + dog.images[i].path);
};
$.imgdog.image = images[0];
$.petname.text = dog.name || 'dog.name';

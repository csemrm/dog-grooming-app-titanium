// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//
//  dogdisplay.js
//  WoodlesApp
//
//  Created by Mostafizur Rahman on 2017-09-08.
//  Copyright 2017 Mostafizur Rahman. All rights reserved.
//

var args = $.args;

var dog = args.dog || {};
Ti.API.info('dog' + JSON.stringify(dog));

var images = [];
$.dogdisply.height = 180;
$.dogdisply.width = '50%';
$.imgdog.width = 148;
$.imgdog.height = 160;
$.dogdisply.dog = dog;
for (var i = 0,
    j = dog.images.length; i < j; i++) {
    images.push(Alloy.CFG.assets + dog.images[i].path);
};
$.imgdog.image = images[0];
$.dogname.text = dog.name || 'dog.name';

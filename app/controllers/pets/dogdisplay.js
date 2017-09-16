// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//
//  dogdisplay.js
//  WoodlesApp
//
//  Created by Mostafizur Rahman on 2017-09-08.
//  Copyright 2017 Mostafizur Rahman. All rights reserved.
//

var args = $.args;
var assets = require('/assets');
var dog = args.dog || {};
Ti.API.info('dog' + JSON.stringify(dog));
var ImageFactory = require('ti.imagefactory');
var images = [];
$.dogdisply.height = 170;
$.dogdisply.width = '50%';
$.imgdog.width = 148;
$.imgdog.height = 148;
$.dogdisply.dog = dog;

$.dogname.text = dog.name || 'dog.name';
loaddog(dog);
function loaddog(dog) {
    var dogimages = dog.images || [];
    if (dogimages.length) {
        for (var i = 0,
            j = dogimages.length; i < j; i++) {

            images.push(Alloy.CFG.assets + dogimages[i].path);
        };

        $.imgdog.add(assets.Utils.RemoteImage({
            image : encodeURI(images[0]),
            width : Ti.UI.FILL,
            height : Ti.UI.FILL,
            top : 0,
            touchEnabled : false
        }));
    } else {
        if (dog.type === 'Dog') {
            var _image = '/images/avators-dog.png';
        } else if (dog.type === 'Cat') {
            var _image = '/images/avators-cat.png';
        }
        $.imgdog.add(assets.Utils.RemoteImage({
            image : encodeURI(_image),
            width : Ti.UI.FILL,
            height : Ti.UI.FILL,
            top : 0,
            touchEnabled : false
        }));
    }
}
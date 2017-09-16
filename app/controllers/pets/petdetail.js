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

$.petdetail.add(Alloy.createController('appointment/add', {
    win : $.petdetail,
    dog : dog
}).getView());

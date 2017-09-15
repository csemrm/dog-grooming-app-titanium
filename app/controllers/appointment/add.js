// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//
//  add.js
//  WoodlesApp
//
//  Created by Mostafizur Rahman on 2017-09-09.
//  Copyright 2017 Mostafizur Rahman. All rights reserved.
//

// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var moment = require('alloy/moment');
var restapi = require('/restapi');
var assets = require('/assets');
var radio = require('/myTiRadioButton');
var indicator = require("/indicator");
var user = Ti.App.Properties.getObject('user', {});
var config = Ti.App.Properties.getObject('config', {});
var promo_id = args.promo_id || '';
var dog = args.dog || {};
var dogs = [];
var appuser_id = user.id;
indicator_win = new indicator();
var dogId = args.dogId || '';
var direction = '';
Ti.API.info('dog' + JSON.stringify(dog));
var images = [];
var itemIndex = 0;
if (dogId)
    loaddog(dog);

var gender_opts = radio.createCheckBoxButtonGroup({
    groupId : 1,
    width : 150,
    height : 120,
    left : 2,
    top : 15,
    layout : 'vertical',
    radioItemsValue : ['Dog Walk', 'Wash', 'Hair Cut', 'Bail Trimming', 'Flea Treatment', 'Over night vacation'],
    radioItemsPadding : 5,
    radioItemsBackgroundSelectedImage : '/images/checkbox_tick.png',
    radioItemsBackgroundImage : '/images/checkbox.png',
    radioItemsWidth : 12,
    radioItemsHeight : 12,
    labelColor : Alloy.CFG.apptheme.input_text_color,
});
//$.genderbox.add(gender_opts);

function onSubmit(e) {
    var date = $.date.text;
    var time = $.time.text;
    var note = (gender_opts.selectedValue).toString();

    var _data = {
        resv_date : date,
        resv_time : time,
        note : note,
        user_id : appuser_id,
        promo_id : promo_id || '',
        dog_id : dogId,
        user_email : user.email || '',
        user_phone_no : user.phone || '',
        user_name : user.username || '',
        status_id : 1
    };

    Ti.API.info('_data  ' + JSON.stringify(_data));
    if (dogId && date && time && note) {

        restapi.reservations(_data, function(data) {
            if (data.error === true) {
                var param = {
                    buttonNames : ['Ok'],
                    message : data.message,
                    callback : function(e) {
                    }
                };
                assets.alertMsg(param);
            } else {
                Ti.API.info('get config' + JSON.stringify(data));
                indicator_win.close();
                var param = {
                    buttonNames : ['Ok'],
                    message : data.message,
                    callback : function(e) {
                        if (promo_id) {
                            args.win.close();
                        }
                    }
                };
                assets.alertMsg(param);
            }
        }, function() {
            indicator_win.close();
            Alloy.createController('error/noapi', {}).getView().open();

        });

    } else {
        var param = {
            buttonNames : ['Ok'],
            message : "All Feild required",
            callback : function(e) {
            }
        };
        assets.alertMsg(param);
    }
}

function openTimePicker() {

    if (OS_IOS) {
        var picker_view = assets.timeanddate_picker('time', $.time, $.add);
        $.add.add(picker_view);
    } else {
        assets.androidPicker('time', $.time);
    }

}

function openDatePicker() {

    if (OS_IOS) {
        var picker_view = assets.timeanddate_picker('date', $.date, $.add);
        $.add.add(picker_view);
    } else {
        assets.androidPicker('date', $.date);
    }

}

function loaddogs(user) {
    var url = user.id;
    restapi.loaddogs(url, function(e) {
        Ti.API.info('e' + JSON.stringify(e));
        if (e.success === true) {
            dogs = e.dogs;
            if (dogId) {
                for (var i = 0,
                    j = dogs.length; i < j; i++) {
                    var _dog = dogs[i];

                    if (_dog.id === dogId) {
                        itemIndex = i;
                    }
                };
            } else {
                loaddog(dogs[0]);
            }
        }
    }, function() {
        var noapi = Alloy.createController('error/noapi', {}).getView().open();
    });
}

loaddogs(user);
function changeDog(e) {
    if (e.direction === 'left') {
        direction = 'left';
        forwardItem();
    } else if (e.direction === 'right') {
        direction = 'right';
        rewindItem();
    }

}

function direction_left(images) {
    var t1 = Ti.UI.create2DMatrix();
    t1 = t1.translate(-300, 0);
    var a1 = Ti.UI.createAnimation();
    a1.transform = t1;
    a1.duration = 400;
    $.imgdog.stop();
    $.imgdog.animate(a1, function() {
        $.imgdog.images = images;
        var t1 = Ti.UI.create2DMatrix();
        t1 = t1.translate(0, 0);
        var a2 = Ti.UI.createAnimation();
        a2.transform = t1;
        a2.duration = 400;
        $.imgdog.animate(a2);
        $.imgdog.start();
    });

}

function direction_right(images) {
    var t1 = Ti.UI.create2DMatrix();
    t1 = t1.translate(300, 0);
    var a1 = Ti.UI.createAnimation();
    a1.transform = t1;
    a1.duration = 400;
    $.imgdog.stop();
    $.imgdog.animate(a1, function() {
        $.imgdog.images = images;
        var t1 = Ti.UI.create2DMatrix();
        t1 = t1.translate(0, 0);
        var a2 = Ti.UI.createAnimation();
        a2.transform = t1;
        a2.duration = 400;
        $.imgdog.animate(a2);
        Ti.API.info('imgdog' + JSON.stringify($.imgdog));
        $.imgdog.start();
    });

}

function forwardItem(e) {

    itemIndex = itemIndex + 1;
    if (itemIndex < dogs.length) {

        Ti.API.info('forwardItem itemIndex _ringtones ' + itemIndex + dogs[itemIndex]);
        reloadImages(dogs[itemIndex]);
    } else {
        itemIndex = itemIndex - 1;

    }

}

function reloadImages(_dog) {
    dog = _dog;
    Ti.API.info('dog ' + JSON.stringify(dog));
    var dogimages = dog.images || [];
    var _images = [];
    if (dogimages.length) {
        for (var i = 0,
            j = dogimages.length; i < j; i++) {
            _images.push(Alloy.CFG.assets + dogimages[i].path);
        };
    } else if (dog.type === 'Dog') {
        _images.push('/images/avators-dog.png');
    } else if (dog.type === 'Cat') {
        _images.push('/images/avators-cat.png');
    }
    dogId = dog.id;

    if (direction === 'left') {
        direction = '';
        direction_left(_images);
        Ti.API.info('direction_left');
    } else if (direction === 'right') {
        direction = '';
        direction_right(_images);
        Ti.API.info('direction_right');
    }

}

function rewindItem(e) {

    if (itemIndex > 0) {

        Ti.API.info('itemIndex ' + itemIndex);
        itemIndex = itemIndex - 1;
        Ti.API.info('forwardItem itemIndex _ringtones ' + itemIndex + dogs[itemIndex]);
        reloadImages(dogs[itemIndex]);
    }

}

function editDog() {
    var addpet = Alloy.createController('auth/signuppetadd', {
        dog : dog
    }).getView();
    addpet.open();
}

function shareDog() {
    var data = {
        status : dog.name,
        subject : dog.name,
        image : $.imgdog.toBlob(),
        view : $.add,
    };
    assets.shareTextWidget(data);

}

function onConfirmSubmit(e) {
    var win = Ti.UI.createWindow({
        id : 'win',
        backgroundColor : "rgb(0,0,0,0.50)"
    });
    var containerView = Ti.UI.createView({
        layout : 'vertical',
        id : 'containerView',
        backgroundColor : Alloy.CFG.apptheme.color_white,
        borderRadius : 8,
        width : 220,
        height : Ti.UI.SIZE
    });
    win.add(containerView);

    // Create a Label.
    var dogname = Ti.UI.createLabel({
        text : "Confirm \n" + dog.name,
        color : Alloy.CFG.apptheme.color_black,
        font : {
            fontSize : 18,
            fontWeight : 'bold'
        },
        height : Ti.UI.SIZE,
        top : 5,
        textAlign : 'center'
    });

    containerView.add(dogname);
    var servView = Ti.UI.createView({
        layout : 'horizontal',
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE
    });
    containerView.add(servView);
    var fora = Ti.UI.createLabel({
        text : "For a:",
        color : Alloy.CFG.apptheme.color_dark,
        font : {
            fontSize : 14,
        },
        height : 20,
        width : 50,
        top : 5,
        left : 10,
    });

    servView.add(fora);
    servView.add(gender_opts);

    var submitbtn = Ti.UI.createImageView({
        image : '/buttons/submit-button.png',
        height : 50,
        top : 10,
    });
    win.addEventListener('click', function(e) {
        if (e.source.id == 'win')
            win.close();
    });
    submitbtn.addEventListener('click', function() {
        onSubmit();
    });
    containerView.add(submitbtn);

    win.open();
}

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

    $.date.text = moment().add(1, 'hour').format('DD/MM/YYYY');
    $.time.text = moment().add(1, 'hour').format('hh:mm A');
}

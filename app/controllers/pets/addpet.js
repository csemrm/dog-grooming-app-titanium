// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var restapi = require('/restapi');
var assets = require('/assets');
var indicator = require("/indicator");
var radio = require('/myTiRadioButton');
var ref = args.ref || 'signup';
var win = args.win || '';
var dog = args.dog || {};
var dogId = '';
//Ti.API.info('dog ' + JSON.stringify(args));

var indicator_win = new indicator();
var config = Ti.App.Properties.getObject('config', {});
var logoImg = config.images[0].path;
$.logo.image = Alloy.CFG.assets + logoImg;
var user = Ti.App.Properties.getObject('user', {});
var appuser_id = user.id;
var images = [];
var animaltype_opts_selectedValue = [false];
var gender_opts_selectedValue = [false];

loadDog(dog);

var gender_opts = radio.createRadioButtonGroup({
    groupId : 1,
    width : 145,
    height : 40,
    left : 10,
    top : 10,
    layout : 'horizontal',
    radioItemsValue : ['Male', 'Female'],
    radioItemsPadding : 5,
    radioItemsBackgroundSelectedImage : '/images/radio_btn1.png',
    radioItemsBackgroundImage : '/images/radio_btn2.png',
    radioItemsWidth : 16,
    radioItemsHeight : Ti.UI.SIZE,
    labelColor : Alloy.CFG.apptheme.input_text_color,
    selectedValue : gender_opts_selectedValue,

});
$.genderbox.add(gender_opts);
var animaltype_opts = radio.createRadioButtonGroup({
    groupId : 1,
    width : 145,
    height : 40,
    left : 10,
    top : 10,
    layout : 'horizontal',
    radioItemsValue : ['Dog', 'Cat'],
    radioItemsPadding : 5,
    radioItemsBackgroundSelectedImage : '/images/radio_btn1.png',
    radioItemsBackgroundImage : '/images/radio_btn2.png',
    radioItemsWidth : 16,
    radioItemsHeight : Ti.UI.SIZE,
    labelColor : Alloy.CFG.apptheme.input_text_color,
    selectedValue : animaltype_opts_selectedValue ,
});
$.animaltypebox.add(animaltype_opts);

animaltype_opts.addEventListener('click', function(e) {
    Ti.API.info('animaltype_opts ' + JSON.stringify(animaltype_opts));
    var type = animaltype_opts.selectedValue[0] || '';
    if (type === 'Dog') {
        $.dogpic.image = '/images/avators-dog.png';
    } else {
        $.dogpic.image = '/images/avators-cat.png';
    }
});
function PhotoOptionDialog() {
    assets.PhotoOptionDialog($.dogpic);
}

function onSubmit(e) {
    var petname = $.petname.value;
    var weight = $.weight.value;
    var bread = $.bread.value;
    var animaltype = Array.isArray(animaltype_opts.selectedValue) ? animaltype_opts.selectedValue[0] : '';
    var gender = Array.isArray(gender_opts.selectedValue) ? gender_opts.selectedValue[0] : '';

    var _data = {
        name : petname,
        weight : weight,
        type : animaltype,
        gender : gender,
        weight : weight,
        bread : bread,
        appuser_id : appuser_id,
        //image : $.dogpic.toImage()
    };
    if (dogId)
        _data.id = dogId;

    Ti.API.info('_data  ' + JSON.stringify(_data));
    if (petname && weight && animaltype && gender && weight && bread && appuser_id) {

        restapi.addpet(_data, function(data) {
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
                if (win !== '') {
                    win.close();
                }
                if (ref === 'home') {

                    Ti.App.fireEvent('reload:lsit', {
                        source : {
                            id : 0
                        }
                    });
                } else {
                    var addpet = Alloy.createController('home', {}).getView();
                    addpet.open();
                }
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

function loadDog(dog) {
    Ti.API.info('dog ' + JSON.stringify(dog));
    dogId = dog.id;
    $.petname.value = dog.name;
    $.weight.value = dog.weight;
    $.bread.value = dog.bread;
    animaltype_opts_selectedValue = [dog.type];
    gender_opts_selectedValue = [dog.gender];

    var dogimages = dog.images || [];
    if (dogimages.length) {
        for (var i = 0,
            j = dogimages.length; i < j; i++) {
            images.push(Alloy.CFG.assets + dogimages[i].path);
        };
        $.dogpic.images = images;
        $.dogpic.start();
    } else if (dog.type === 'Dog') {
        $.dogpic.image = '/images/avators-dog.png';
    } else if (dog.type === 'Cat') {
        $.dogpic.image = '/images/avators-cat.png';
    }
}


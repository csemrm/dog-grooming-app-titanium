var moment = require('alloy/moment');
var cl = Titanium.Locale.getCurrentLanguage();
var ImageFactory = require('ti.imagefactory');

 
function alertMsg(args) {
    args = args || {};
    if (args.buttonNames) {
        if (args.buttonNames.length === 1) {
            args.ok = args.buttonNames[0];
        } else {
            args.no = args.buttonNames[0];
            args.yes = args.buttonNames[1];
        }
    }

    var alertDialog = Ti.UI.createAlertDialog({
        title : L('appname'),
        message : args.message,
        buttonNames : (args.buttonNames.length === 1) ? [args.ok] : [args.no, args.yes],
        cancel : 0
    });
    alertDialog.addEventListener('click', function(evt) {
        Ti.API.info('args.callback ' + JSON.stringify(args.callback));
        if (args.callback) {
            args.callback(evt || {});
        }
        args = null;
    });
    alertDialog.show();
};
exports.alertMsg = alertMsg;
exports.findInJson = function(object, key1, value) {//pass it the desired matching key value pairs
    var i = 0;
    for (var key in object) {//this will iterate through key1 - key3
        var current = object[key];
        if (current[key1] == value) {
            return object[i];
            //return the index
        }
        i++;
        //increment if no found
    }
    return -1;
};

exports.findInJson_index = function(object, key1, value) {//pass it the desired matching key value pairs
    var i = 0;
    for (var key in object) {//this will iterate through key1 - key3
        var current = object[key];
        if (current[key1] == value) {
            return i;
            //return the index
        }
        i++;
        //increment if no found
    }
    return -1;
};

exports.textFilter = function(array, string) {

    Ti.API.info('textFilter.array ' + JSON.stringify(array) + ' string ' + string);

    for (var i = 0,
        j = array.length; i < j; i++) {
        var phr = array[i];
        Ti.API.info('(phr.id) === parseInt(string) ' + (phr.id) + "===" + parseInt(string) + (parseInt(phr.id) === parseInt(string)));
        if (parseInt(phr.id) === parseInt(string)) {
            return phr;
        }
    };

    return array[0];
};

exports.formatPhoneNumber = function(phone) {

    phone = phone.replace(/[^\d]/g, "");

    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

};

exports.geolocationPermissions = function geolocation(callback) {

    if (OS_IOS) {
        Ti.API.info('Ti.Geolocation.allowsBackgroundLocationUpdates', Ti.Geolocation.allowsBackgroundLocationUpdates);
        Ti.API.info('Ti.Geolocation.locationServicesEnabled', Ti.Geolocation.locationServicesEnabled);
    }

    var hasLocationPermissions = Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS);
    Ti.API.info('Ti.Geolocation.hasLocationPermissions', hasLocationPermissions);

    if (hasLocationPermissions) {
        callback(true);
    }

    if (OS_IOS) {
        var map = {};
        map[Ti.Geolocation.AUTHORIZATION_ALWAYS] = 'AUTHORIZATION_ALWAYS';
        map[Ti.Geolocation.AUTHORIZATION_AUTHORIZED] = 'AUTHORIZATION_AUTHORIZED';
        map[Ti.Geolocation.AUTHORIZATION_DENIED] = 'AUTHORIZATION_DENIED';
        map[Ti.Geolocation.AUTHORIZATION_RESTRICTED] = 'AUTHORIZATION_RESTRICTED';
        map[Ti.Geolocation.AUTHORIZATION_UNKNOWN] = 'AUTHORIZATION_UNKNOWN';
        map[Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE] = 'AUTHORIZATION_WHEN_IN_USE';

        var locationServicesAuthorization = Ti.Geolocation.locationServicesAuthorization;
        Ti.API.info('Ti.Geolocation.locationServicesAuthorization', 'Ti.Geolocation.' + map[locationServicesAuthorization]);

    }

    Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
        Ti.API.info('Ti.Geolocation.requestLocationPermissions', JSON.stringify(e));
        if (e.success) {
            callback(true);
        } else {
            var param = {
                buttonNames : [L('ok')],
                message : L('password_mismatch')
            };
            alertMsg(param);
            callback(false);
        }
    });
};

exports.getLocation = function getLocation(callback) {
    Titanium.Geolocation.distanceFilter = 10;
    if (OS_ANDROID) {

        Titanium.Geolocation.purpose = "Find location of device.";
        Titanium.Geolocation.manualMode = true;
        Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

        var gpsProvider = Titanium.Geolocation.Android.createLocationProvider({
            name : Titanium.Geolocation.PROVIDER_NETWORK || Titanium.Geolocation.PROVIDER_GPS,
            minUpdateTime : 60,
            minUpdateDistance : 100
        });
        Titanium.Geolocation.Android.addLocationProvider(gpsProvider);

        var gpsRule = Titanium.Geolocation.Android.createLocationRule({
            provider : Titanium.Geolocation.PROVIDER_GPS || Titanium.Geolocation.PROVIDER_NETWORK,
            accuracy : 100,
            maxAge : 300000,
            minAge : 10000
        });
        Titanium.Geolocation.Android.addLocationRule(gpsRule);
    } else {

        Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
        Titanium.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
        var authCode = Titanium.Geolocation.locationServicesAuthorization;
        Ti.API.info("authCode ", authCode);

        if (authCode === 0 || authCode === "AUTHORIZATION_DENIED" || authCode === "AUTHORIZATION_RESTRICTED") {

            var param = {
                buttonNames : [L('ok')],
                message : L('userDisabledLocation_err')
            };
            alertMsg(param);

        } else {
            Ti.API.info(' AUTHORIZED, authCode = ', authCode);
            auth = true;
        }
    }
    Ti.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.API.info("Alloy.Globals.getCurrentLocation(): Error in getting current position. - ", e.error);
            var param = {
                buttonNames : [L('ok')],
                message : L('userDisabledLocation_err')
            };
            alertMsg(param);
        } else {
            Ti.API.info("Alloy.Globals.getCurrentLocation(): Success in reading current position - [" + e.coords.latitude + ", " + e.coords.longitude + "].");
            console.log('GPS RESULTS ', JSON.stringify(e));

            if (e.coords.latitude && e.coords.longitude) {
                callback(e.coords);
                Ti.App.Properties.setObject('coords', e.coords);
            } else {
                var param = {
                    buttonNames : [L('ok')],
                    message : L('userDisabledLocation_err')
                };
                alertMsg(param);
            }
        }
    });
};

exports.PhotoOptionDialog = function(truckImageBox) {

    var dialog = Ti.UI.createOptionDialog({
        options : [L("camera"), L("gallery"), L("cancel")],
        cancel : 2,
    });

    dialog.addEventListener('click', function(e) {
        if (e.index == 0) {

            if (Ti.Media.hasCameraPermissions()) {
                cShowCamera(truckImageBox);
            } else {
                Ti.Media.requestCameraPermissions(function(e) {
                    if (e.success === true) {
                        cShowCamera(truckImageBox);
                    } else {
                        var param = {
                            buttonNames : [L("ok")],
                            message : "Access denied, error: " + e.error,

                        };
                        alertMsg(param);
                    }
                });
            }

        } else if (e.index == 1) {
            Ti.Media.openPhotoGallery({
                success : function(e) {
                    if (e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                        var image = ImageFactory.imageAsResized(e.media, {
                            width : 1024,
                            height : 786
                        });
                        truckImageBox.image = image;
                    }
                },
                cancel : function() {
                },
                error : function() {
                },
                mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
            });
        }
    });
    dialog.show();

};
function cShowCamera(truckImageBox) {
    Titanium.Media.showCamera({
        success : function(event) {
            Ti.API.debug('Our type was: ' + event.mediaType);
            if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                var image = ImageFactory.imageAsResized(event.media, {
                    width : 1024,
                    height : 786
                });
                truckImageBox.image = image;
            }
        },
        cancel : function() {
        },
        error : function(error) {
            var a = Titanium.UI.createAlertDialog({
                title : 'Camera'
            });
            if (error.code == Titanium.Media.NO_CAMERA) {
                a.setMessage("Please run this test on device");
            } else {
                //a.setMessage("Unexpected_error :" + error.code);
            }
            a.show();
        },
        saveToPhotoGallery : false,
        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
    });
}

exports.shareTextWidget = function(e) {
    // share text status
    var socialWidget = Alloy.createWidget('com.alcoapps.socialshare');
    socialWidget.share(e);
};
exports.secretCodeGent = function(e) {
    // share text status

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < 4; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

};

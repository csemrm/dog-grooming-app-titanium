var xhr = require("/restapi");
var assets = require('/assets');
exports.subscribe = function() {
    var _iOS = (Ti.Platform.osname == "ipad" || Ti.Platform.osname == "iphone");
    var _iPad = "ipad";
    var _iPhone = "iphone";
    var _android = "android";
    var _platform = Ti.Platform.osname;
    //var ui = require("ui");
    //var indicator = ui.getActivityIndicator();

    //*********************  PUSH NOTIFICATIONS **************************/

    function subscribeToken(token) {
        Ti.API.info('Device Token: ' + token);
        //APA91bF1aBhill3oDGDflSfDc3pBhqe-tfJQfdKHJdAlFvZN_XR1BRAvXJ4RzcJqEUdz1EfqYi-CJPsAuOz_arauC7b5D2kxxZ38_lci5gqo8CcUK6snk42ZXCf2sq8Ehd1xgmhgOi6lokpBueuiDgphzDKaZ0cqQw
        xhr.userDevice({
            "UserId" : Ti.App.Properties.getObject('user').id,
            "DeviceTypeId" : OS_IOS ? "IOS" : "Android",
            "DeviceToken" : token
        }, function(results) {
            var response = JSON.parse(results);
            Ti.API.info("RESPONSE: " + response);
            Ti.App.Properties.setString('UserDeviceId', response.UserDeviceId);
        }, function(results) {
        });
    }

    if (_platform == _android) {
        var gcm = require('nl.vanvianen.android.gcm');

        var lastData = gcm.getLastData();
        if (lastData) {
            Ti.API.info("Last notification received " + JSON.stringify(lastData));
            gcm.clearLastData();
        }

        gcm.registerPush({
            senderId : '165354934161',
            notificationSettings : {
                sound : 'default', /* Place sound file in platform/android/res/raw/mysound.mp3 */
                smallIcon : 'appicon.png', /* Place icon in platform/android/res/drawable/notification_icon.png */
                largeIcon : 'appicon.png', /* Same */
                vibrate : true, /* Whether the phone should vibrate */
                insistent : true, /* Whether the notification should be insistent */
                localOnly : false, /* Whether this notification should be bridged to other devices */
                priority : +2, /* Notification priority, from -2 to +2 */
                bigText : false,
                /* You can also set a static value for title, message, or ticker. If you set a value here, the key will be ignored. */
                // title: '',
                // message: '',
                // ticker: ''
                /* Add LED flashing */
                ledOn : 200,
                ledOff : 300
            },
            success : function(event) {
                Ti.API.info("Push registration success: " + JSON.stringify(event));
                /* Add code to send event.registrationId to your server */
                subscribeToken(event.registrationId);
            },
            error : function(event) {
                Ti.API.info("Push registration error: " + JSON.stringify(event));
                alert(event.error);
            },
            callback : function(event) {
                Ti.API.info("Push callback = " + JSON.stringify(event));
                /* Called when a notification is received and the app is in the foreground */
            }
        });

    } else if (_platform == _iPhone) {

        function tokenReceivedIOS(e) {
            Ti.App.Properties.setString("deviceToken", e.deviceToken);
            if (!Titanium.App.Properties.getBool('tokenSubscribed', false)) {
                subscribeToken(e.deviceToken);
            }
        }

        function errorCallbackPush(e) {
            Ti.App.Properties.setString("deviceToken", "");
        }

        function messageCallbackPush(thePush) {
            alert(thePush);
            //or alert(thePush.data);
        }

        function registerForPush() {
            Ti.Network.registerForPushNotifications({
                success : tokenReceivedIOS,
                error : errorCallbackPush,
                callback : messageCallbackPush
            });
            // Remove event listener once registered for push notifications
            Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
        };

        // Wait for user settings to be registered before registering for push notifications
        Ti.App.iOS.addEventListener('usernotificationsettings', registerForPush);

        // Register notification types to use
        Ti.App.iOS.registerUserNotificationSettings({
            types : [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
        });

    }

};

exports.unsubscribe = function() {

};

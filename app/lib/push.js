var Cloud = require('ti.cloud');
Cloud.debug = false;

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

    }

    if (_platform == _android) {
        var CloudPush = require('ti.cloudpush');
        CloudPush.retrieveDeviceToken({
            success : function deviceTokenSuccess(e) {
                Ti.API.info('Device Token: ' + e.deviceToken);
                Ti.App.Properties.setString("deviceToken", e.deviceToken);
                if (!Titanium.App.Properties.getBool('tokenSubscribed', false)) {
                    subscribeToken(e.deviceToken);
                }
            },
            error : function deviceTokenError(e) {
                //alert('Failed to register for push! ' + e.error);
            }
        });
        CloudPush.enabled = true;

        CloudPush.addEventListener('callback', function(evt) {
            // alert(evt.payload);
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
            //alert(thePush);
            //or alert(thePush.data);
        }

        if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
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

        } else {
            //This is in iOS <8
            /**
             * Register user for push notification
             * @param {Object} p
             */
            var registerForPushIOS = function(p) {
                Titanium.Network.registerForPushNotifications({
                    types : [Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT, Titanium.Network.NOTIFICATION_TYPE_SOUND],
                    success : tokenReceivedIOS,
                    error : errorCallbackPush,
                    callback : messageCallbackPush
                });
            };
            registerForPushIOS();
        }
    }

};

exports.unsubscribe = function() {

};

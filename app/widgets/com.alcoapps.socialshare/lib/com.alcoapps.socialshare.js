/*
 SocialShare : Titanium Module for cross-platform sharing of text and images over social networks

 This module requires dl.napp.social for iOS which you can get from https://github.com/viezel/TiSocial.Framework

 iOS:
 The native sharing Action Sheet is displayed and offers options for sharing with Facebook and Twitter (if the native apps are installed),
 plus AirDrop, Text Message, Email and other built-in iOS mechanisms.

 Android:
 For Android it uses the Native Sharing Intent, which brings up a list of installed apps to choose from.

 Arguments:

 image 				: Given as nativePath
 status 				: The text status to share
 androidDialogTitle 	: The title of the Andorid share window
 */
function share(args) {
    if (OS_ANDROID) {

        var intent = Ti.Android.createIntent({
            action : Ti.Android.ACTION_SEND
        });
        intent.putExtra(Ti.Android.EXTRA_SUBJECT, args.subject);
        if (args.link) {
            intent.putExtra(Ti.Android.EXTRA_TEXT, args.link);
        }
        if (args.status) {
            intent.putExtra(Ti.Android.EXTRA_TEXT, args.status);
        }
        if (args.image) {
            intent.type = "image/*";
            intent.putExtraUri(Ti.Android.EXTRA_STREAM, args.image);
        }
        if (args.file) {
            intent.putExtraUri(Ti.Android.EXTRA_STREAM, args.file);
        }
        var share = Ti.Android.createIntentChooser(intent, args.androidDialogTitle);

        Ti.Android.currentActivity.startActivity(share);

    } else {
        var Social = require('dk.napp.social');

        console.log("Facebook available: " + Social.isFacebookSupported());
        console.log("Twitter available: " + Social.isTwitterSupported());

        var fbAccount;
        Social.addEventListener("facebookAccount", function(e) {
            console.log("facebookAccount: " + e.success);
            fbAccount = e.account;
            console.log(e);
        });

        Social.addEventListener("complete", function(e) {
            console.log("complete: " + e.success);
            console.log(e);

            if (e.platform == "activityView" || e.platform == "activityPopover") {
                switch (e.activity) {
                case Social.ACTIVITY_TWITTER:
                    console.log("User is shared on Twitter");
                    break;

                case Social.ACTIVITY_CUSTOM:
                    console.log("This is a customActivity: " + e.activityName);
                    break;
                }
            }
        });

        Social.addEventListener("error", function(e) {
            console.log("error:");
            console.log(e);
        });

        Social.addEventListener("cancelled", function(e) {
            console.log("cancelled:");
            console.log(e);
        });

        // do the actual sharing
        var payload = {};
        payload.text = args.status;
        if (args.image) {
            payload.image = args.image;
        }
        if (Social.isActivityViewSupported()) {//min iOS6 required
            Social.activityView(payload);
        } else {
            alert('Sorry...your phone appears to be old-ish...sorry');
        }
        //
    }
}

exports.share = share;

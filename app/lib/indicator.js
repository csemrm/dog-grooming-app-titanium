function indicator() {
    var statusBarStyle = null;
    // if (Ti.Platform.osname != "android")
    // statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;

    var win = Ti.UI.createWindow({
        backgroundColor : 'transparent', 
        statusBarStyle : statusBarStyle,
        theme : "Theme.AppCompat.Translucent.NoTitleBar", 
        fullscreen : false
    });

    var images = [];
    for (var i = 0; i < 9; i++) {
        images.push('/images/loading/loading' + i + '.png');
    }

    var ani_image_view = Ti.UI.createImageView({
        images : images,
        width : 120,
        height : 120,

    });

    win.add(ani_image_view);

    win.addEventListener('open', function() {
        ani_image_view.start();

    });

    win.addEventListener('close', function() {
        ani_image_view.stop();
    });
    win.addEventListener('androidback', function(e) {

    });

    return win;

}

module.exports = indicator;

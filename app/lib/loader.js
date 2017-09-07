var indicator = require("./indicator");
indicator_win = new indicator();
exports.get = function(args) {
    if (null != args) {
        indicator_win.open();
        var url = args.url;
        var xhr = Ti.Network.createHTTPClient({
            onload : function(e) {
                indicator_win.close();
                if (this.responseText != "") {
                    var feeds = eval('(' + this.responseText + ')');
                    if (args.callbackFunction) {
                        args.callbackFunction(feeds);
                        console.log("Response From API : " + JSON.stringify(feeds));
                    }

                }

            },
            onerror : function(e) {
                indicator_win.close();
                console.log("STATUS: " + this.status);
                console.log("TEXT:   " + this.responseText);
                console.log("ERROR:  " + e.error);

            }
        });

        console.log('GET URL : ' + url);

        xhr.setTimeout(10000);
        xhr.open("GET", url);
        xhr.send();

    }
};

exports.downloadFileToApp = function(args) {

    if (null != args) {
        indicator_win.open();
        var url = args.urlDownload;
        var fileName = args.fileName;

        var xhr = Ti.Network.createHTTPClient({
            onload : function(e) {
                indicator_win.close();

                var path = null;

                if (OS_IOS)
                    path = Titanium.Filesystem.applicationDataDirectory;
                else
                    path = Titanium.Filesystem.externalStorageDirectory;

                var localFile = Titanium.Filesystem.getFile(path, fileName);
                if (localFile.exists()) {
                    localFile.deleteFile();
                }

                var f = Titanium.Filesystem.getFile(path, fileName);
                f.write(xhr.responseData);
                console.log("xhr response : " + xhr.responseData);

                if (args.callbackFunction) {
                    args.callbackFunction(fileName, args.fileType);
                }

            },
            onerror : function(e) {
                indicator_win.close();
                Ti.API.debug("STATUS: " + this.status);
                Ti.API.debug("TEXT:   " + this.responseText);
                Ti.API.debug("ERROR:  " + e.error);

            },
            timeout : 5000
        });
        console.log("Download URL : " + url);
        xhr.open("GET", url);
        xhr.send();
    }
};

exports.post = function(args) {
    if (null != args) {
        indicator_win.open();
        var url = args.url;
        var postPayload = args.payload;

        var xhr = Ti.Network.createHTTPClient({
            onload : function(e) {
                indicator_win.close();
                console.log(this.responseText);
                if (this.responseText != "") {
                    var feeds = eval('(' + this.responseText + ')');

                    console.log("Response From API : " + JSON.stringify(feeds));
                    if (args.callbackFunction) {
                        args.callbackFunction(feeds);
                    }

                }

            },
            onerror : function(e) {
                indicator_win.close();
                Ti.API.debug("STATUS: " + this.status);
                Ti.API.debug("TEXT:   " + this.responseText);
                Ti.API.debug("ERROR:  " + e.error);

            },
            timeout : 5000
        });

        postPayload = JSON.stringify(postPayload);
        console.log("POST URL : " + url);
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(postPayload);

    }
};
exports.upload = function(args) {
    if (null != args) {
        indicator_win.open();
        var url = args.url;
        var postPayload = args.payload;

        var xhr = Ti.Network.createHTTPClient({
            onload : function(e) {
                indicator_win.close();
                console.log(this.responseText);
                if (this.responseText != "") {
                    var feeds = eval('(' + this.responseText + ')');

                    console.log("Response From API : " + JSON.stringify(feeds));
                    if (args.callbackFunction) {
                        args.callbackFunction(feeds);
                    }

                }

            },
            onerror : function(e) {
                indicator_win.close();
                Ti.API.debug("STATUS: " + this.status);
                Ti.API.debug("TEXT:   " + this.responseText);
                Ti.API.debug("ERROR:  " + e.error);

            },
            timeout : 5000
        });

        //postPayload = JSON.stringify(postPayload);
        console.log("POST URL : " + url);
        xhr.open("POST", url);
        //xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(postPayload);

    }
};
exports.put = function(args) {
    if (null != args) {
        indicator_win.open();
        var url = args.url;
        var postPayload = args.payload;

        var xhr = Ti.Network.createHTTPClient({
            onload : function(e) {
                indicator_win.close();
                if (this.responseText != "") {
                    var feeds = eval('(' + this.responseText + ')');

                    console.log("Response From API : " + JSON.stringify(feeds));
                    if (args.callbackFunction) {
                        args.callbackFunction(feeds, args.needUpdate);
                    }

                }

            },
            onerror : function(e) {
                indicator_win.close();
                Ti.API.debug("STATUS: " + this.status);
                Ti.API.debug("TEXT:   " + this.responseText);
                Ti.API.debug("ERROR:  " + e.error);
            },
            timeout : 5000
        });

        postPayload = JSON.stringify(postPayload);
        console.log("PUT URL " + url);
        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(postPayload);

    }
};

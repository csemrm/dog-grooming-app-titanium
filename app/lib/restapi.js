var indicator = require("./indicator");
var restURL = Alloy.CFG.restURL;
//indicator_win = new indicator();

exports.getConfig = function(onSucess, onError) {

    var xhr = Ti.Network.createHTTPClient({
        onload : function() {
            Ti.API.info('this.responseText ' + this.responseText);
            json = JSON.parse(this.responseText);
            onSucess(json);
        },
        onerror : function(e) {
            Ti.API.info('this.responseText onerror' + this.responseText + JSON.stringify(e));
            //var json = JSON.parse(this.responseText);
            onError();
        },
        timeout : 50000
    });

    var url = restURL + 'config/indesx';
    Ti.API.info('url ' + url);
    xhr.open('GET', encodeURI(url));
    xhr.send();

};

exports.login = function(data, callback) {

    //indicator_win.open();
    var xhr = Ti.Network.createHTTPClient({
        onload : function() {
            //indicator_win.close();
            Ti.API.info('this.responseText ' + this.responseText);
            json = JSON.parse(this.responseText);
            callback(json);
        },
        onerror : function(e) {
            //indicator_win.close();
            Ti.API.info('this.responseText onerror' + this.responseText);
        },
        timeout : 50000
    });

    Ti.API.info('data ' + JSON.stringify(data));
    var url = restURL + 'appusers/login';
    Ti.API.info('url ' + url);
    xhr.open('POST', encodeURI(url));
    xhr.send(data);

};

exports.register = function(data, callback) {

    //indicator_win.open();
    var xhr = Ti.Network.createHTTPClient({
        onload : function() {
            //indicator_win.close();
            Ti.API.info('this.responseText ' + this.responseText);
            json = JSON.parse(this.responseText);
            callback(json);
        },
        onerror : function(e) {
            //indicator_win.close();
            Ti.API.info('this.responseText onerror' + this.responseText);
        },
        timeout : 50000
    });

    Ti.API.info('data ' + JSON.stringify(data));
    var url = restURL + 'appusers/add';
    Ti.API.info('url ' + url);
    xhr.open('POST', encodeURI(url));
    xhr.send(data);

};

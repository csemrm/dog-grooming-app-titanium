var indicator = require("./indicator");
var restURL = Alloy.CFG.restURL;

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

    var url = restURL + 'config/index';
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
exports.loaddogs = function(data, onSucess, onError) {

    var xhr = Ti.Network.createHTTPClient({
        onload : function() {
            Ti.API.info('this.responseText ' + this.responseText);
            json = JSON.parse(this.responseText);
            onSucess(json);
        },
        onerror : function(e) {
            onError();
            Ti.API.info('this.responseText onerror' + this.responseText);
        },
        timeout : 50000
    });

    Ti.API.info('data ' + JSON.stringify(data));
    var url = restURL + 'dogs/get/appuser_id/' + data;
    Ti.API.info('url ' + url);
    xhr.open('GET', encodeURI(url));
    xhr.send();

};

exports.loadpromos = function(onSucess, onError) {

    var xhr = Ti.Network.createHTTPClient({
        onload : function() {
            Ti.API.info('this.responseText ' + this.responseText);
            json = JSON.parse(this.responseText);
            onSucess(json);
        },
        onerror : function(e) {
            onError();
            Ti.API.info('this.responseText onerror' + this.responseText);
        },
        timeout : 50000
    });

    var url = restURL + 'feeds/index/count/10';
    Ti.API.info('url ' + url);
    xhr.open('GET', encodeURI(url));
    xhr.send();

};
exports.addpet = function(data, callback) {

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
    var url = restURL + 'dogs/add';
    Ti.API.info('url ' + url);
    xhr.open('POST', encodeURI(url));
    xhr.send(data);

};

exports.reservations = function(data, callback) {

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
    var url = restURL + 'reservations/add';
    Ti.API.info('url ' + url);
    xhr.open('POST', encodeURI(url));
    xhr.send(data);

};

exports.userDevice = function(data, onSucess, onError) {

    //indicator_win.open();
    var xhr = Ti.Network.createHTTPClient({
        onload : function() {
            //indicator_win.close();
            Ti.API.info('this.responseText ' + this.responseText);
            json = JSON.parse(this.responseText);
            onSucess(json);
        },
        onerror : function(e) {
            //indicator_win.close();
            Ti.API.info('this.responseText onerror' + this.responseText);
            onError();
        },
        timeout : 50000
    });

    Ti.API.info('data ' + JSON.stringify(data));
    var url = restURL + 'user_device/add';
    Ti.API.info('url ' + url);
    xhr.open('POST', encodeURI(url));
    xhr.send(data);

};

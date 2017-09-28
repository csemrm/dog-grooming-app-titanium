//
//  home.js
//  WoodlesApp
//
//  Created by Mostafizur Rahman on 2017-09-07.
//  Copyright 2017 Mostafizur Rahman. All rights reserved.
//

var args = $.args;
var restapi = require('/restapi');
var assets = require('/assets');
var push = require('/push');
var user = Ti.App.Properties.getObject('user', {});
var config = Ti.App.Properties.getObject('config', {});
push.subscribe();
var itemIndex = 0;
inti();

function inti() {
    $.navigationBar.setTitle(config.company_name);
    $.navigationBar.setBackgroundColor(Alloy.CFG.apptheme.top_nev_bar_bg);
    /*
     $.navigationBar.showLeft({
     image : '/icons/appointment_reminders.png',
     callback : function(_event) {

     }
     });

     $.navigationBar.showMyRight({
     icon : '/icons/map_marker.png',
     _callback : function(_event) {
     Ti.Platform.openURL('https://www.google.com.bd/maps/search/' + config.contact_address);
     }
     });*/

}

var tabs = [{
    id : 0,
    title : ('Home'),
    icon : "/icons/home.png",
    activeicon : "/icons/home-o.png",
    controller : 'pets/home',
    ref : 'pets_home',
}, {
    id : 1,
    title : ('Appointments'),
    icon : "/icons/planner.png",
    activeicon : "/icons/planner-o.png",
    controller : 'appointment/add',
    ref : 'pets_home',
}, {
    id : 2,
    title : ('My Pets'),
    icon : "/icons/xlarge_icons.png",
    activeicon : "/icons/xlarge_icons-o.png",
    controller : 'pets/list',
    ref : 'pets_home',
}, {
    id : 3,
    title : ('Specials'),
    icon : "/icons/advertising.png",
    activeicon : "/icons/advertising-o.png",
    controller : 'promotions/list',
    ref : 'specials',
}];

// Initialize the tab bar
$.Tabs.init({
    nodes : tabs,
    color : {
        background : Alloy.CFG.apptheme.color_white,
        active : Alloy.CFG.apptheme.tab_active_color,
        text : Alloy.CFG.apptheme.tab_normal_color,
    }
});

// Add an event listener on the tabs
$.Tabs.Wrapper.addEventListener("click", handleTabClick);

// Handle the click event on a tab
function handleTabClick(_event) {
    Ti.API.info('handleTabClick ' + JSON.stringify(_event));
    if ( typeof _event.source.id !== "undefined") {
        itemIndex = _event.source.id || 0;
        $.Tabs.setIndex(_event.source.id);
        $.mapContainner.removeAllChildren();
        var ref = _event.source.ref || 'home';
        var controller = Alloy.createController(tabs[_event.source.id].controller, {
            ref : ref,
            dog : _event.source.dog || {},
            dogId : _event.source.dogId || ''
        }).getView();
        $.mapContainner.add(controller);
    }
}

Ti.App.addEventListener('reload:lsit', handleTabClick);
setTimeout(function() {
    $.Tabs.setIndex(0);
    $.mapContainner.removeAllChildren();
    var controller = Alloy.createController(tabs[0].controller).getView();
    $.mapContainner.add(controller);
}, 500);

$.main.addEventListener('click', function(e) {
    Ti.API.info('ee' + JSON.stringify(e));
});

$.main.addEventListener('open', function(e) {
    Ti.App.fireEvent('app:homeopen', e);

});
Ti.App.addEventListener('app:messagePush', messagePush);
function messagePush(event) {
    Ti.API.info('messagePush ' + JSON.stringify(event));
    var popcontroller = Alloy.createController('pets/notificationdisplay', event).getView();
    popcontroller.open();
    Ti.App.removeEventListener('app:messagePush', messagePush);
}

function changeTab(e) {
    Ti.API.info(' tabs changeTab tabs ' + JSON.stringify(e));
    if (e.direction === 'left') {
        direction = 'left';
        forwardItem();
    } else if (e.direction === 'right') {
        direction = 'right';
        rewindItem();
    }

}

function forwardItem(e) {

    itemIndex = itemIndex + 1;
    if (itemIndex < tabs.length) {

        Ti.API.info('forwardItem itemIndex _ringtones ' + itemIndex + JSON.stringify(tabs[itemIndex]));
        handleTabClick({
            source : tabs[itemIndex]
        });
    } else {
        itemIndex = itemIndex - 1;

    }

}

function rewindItem(e) {

    if (itemIndex > 0) {

        Ti.API.info('itemIndex ' + itemIndex);
        itemIndex = itemIndex - 1;
        Ti.API.info('forwardItem itemIndex _ringtones ' + itemIndex + JSON.stringify(tabs[itemIndex]));
        handleTabClick({
            source : tabs[itemIndex]
        });
    }

}

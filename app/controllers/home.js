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
var user = Ti.App.Properties.getObject('user', {});
//inti();

function inti() {
    $.navigationBar.setBackgroundColor(Alloy.CFG.apptheme.top_nev_bar_bg);

    $.navigationBar.showLeft({
        image : '/icons/appointment_reminders.png',
        callback : function(_event) {

        }
    });

    $.navigationBar.showMyRight({
        icon : '/icons/businessman.png',
        _callback : function(_event) {
            //Alloy.createController('foodtruck/mapsearch').getView().open();
        }
    });

}

var tabs = [{
    id : 0,
    title : ('Home'),
    icon : "/icons/xlarge_icons.png",
    activeicon : "/icons/xlarge_icons-o.png",
    controller : 'pets/list'
}, {
    id : 1,
    title : ('Appointments'),
    icon : "/icons/planner.png",
    activeicon : "/icons/planner-o.png",
    controller : 'appointment/add'
}, {
    id : 2,
    title : ('My Pets'),
    icon : "/icons/xlarge_icons.png",
    activeicon : "/icons/xlarge_icons-o.png",
    controller : 'pets/list'
}, {
    id : 3,
    title : ('Specials'),
    icon : "/icons/advertising.png",
    activeicon : "/icons/advertising-o.png",
    controller : 'promotions/list'
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
        $.Tabs.setIndex(_event.source.id);
        $.mapContainner.removeAllChildren();
        var controller = Alloy.createController(tabs[_event.source.id].controller, {
            ref : 'home'
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

/**
 * The tab bar widget
 *
 * @class Widgets.com.csemrm.tabs
 */

/**
 * Initializes the tab bar
 * @param {Object} _params
 * @param {Array} _params.nodes The nodes (tab items) to show in the TabGroup as defined by the JSON configuration file
 * @param {String} _params.more The image for the "..." (more) tab
 * @param {Object} _params.color The colors to use for the tab bar
 * @param {String} _params.color.background The background of the tab bar (hex)
 * @param {String} _params.color.active The background of an active tab (hex)
 * @param {String} _params.color.text The tab text color (hex)
 */
var color_active = '#fff',
    color_text = '#fff';
$.init = function(_params) {
    $.nodes = [];
    $.excess = false;
    $.excessLength = 6;
    $.moreOpen = true;
    $.width = 0;
    color_text = _params.color.text;
    color_active = _params.color.active;
    $.display = {
        width : Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth,
        height : Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight,
        dpi : Ti.Platform.displayCaps.dpi
    };

    if (OS_ANDROID) {
        $.display.width = ($.display.width / ($.display.dpi / 160));
        $.display.height = ($.display.height / ($.display.dpi / 160));
    }

    if (Alloy.isTablet) {
        $.excessLength = Math.floor($.display.width / 70);
    }

    if (_params.nodes.length > $.excessLength) {
        $.excess = true;
    }

    $.width = $.excess ? Math.floor($.display.width / $.excessLength) : Math.floor($.display.width / _params.nodes.length);

    $.TabGroup.backgroundColor = _params.color.background;
    $.Indicator.backgroundColor = _params.color.active;

    $.IndicatorContainer.width = $.display.width + "dp";
    $.Indicator.width = $.width + "dp";
    $.TabContainer.width = $.display.width + "dp";

    for (var i = 0; i < _params.nodes.length; i++) {

        var tab = Ti.UI.createView({
            id : _params.nodes[i].id,
            width : $.width + "dp",
            height : "60dp",
            bottom : "0dp",
            left : "0dp"
        });

        var label = Ti.UI.createLabel({
            text : _params.nodes[i].title,
            top : "42dp",
            //left : "5dp",
            //right : "5dp",
            width : Ti.UI.FILL,
            height : "15dp",
            font : {
                fontSize : "10dp",
                fontFamily : "HelveticaNeue"
            },
            color : _params.color.text,
            textAlign : "center",
            touchEnabled : false
        });

        if (_params.nodes[i].image) {
            var icon = Ti.UI.createLabel({
                // icon : 'fa-flag',
                width : "32dp",
                height : "32dp",
                font : {
                    fontSize : "24dp",
                },
                color : _params.color.text,
                top : "7dp",
                touchEnabled : false,
                preventDefaultImage : true
            });
            $.fa.add(icon, _params.nodes[i].image);
            tab.add(icon);
        } else if (_params.nodes[i].icon) {
            var icon = Ti.UI.createImageView({
                // icon : 'fa-flag',
                width : "32dp",
                height : "32dp",
                image : _params.nodes[i].icon,
                activeicon : _params.nodes[i].activeicon,
                normalicon : _params.nodes[i].icon,
                top : "7dp",
                touchEnabled : false,
                preventDefaultImage : true
            });
            tab.add(icon);
        }

        tab.add(label);

        if ($.excess && i >= ($.excessLength - 1)) {
            tab.width = $.width + "dp";
            //label.left = "5dp";

            $.nodes.push(tab);

        } else {
            $.nodes.push(tab);
        }
    }

    for (var i = 0,
        z = $.excessLength; i < z; i++) {
        if ($.nodes[i]) {
            $.Tabs.add($.nodes[i]);
        }
    }
    $.Tabs.addEventListener("click", function(_event) {

        if ( typeof _event.source.id !== "undefined" && typeof _event.source.id == "number") {
            $.setIndex(_event.source.id);
        }
    });
};

/**
 * Clears all items from the tab bar
 */
$.clear = function() {
    var children = $.Tabs.children;

    for (var i = 0; i < children.length; i++) {
        $.Tabs.remove(children[i]);
    }

};

/**
 * Sets the indexed item as active
 * @param {Object} _index The index of the item to show as active
 */
$.setIndex = function(_index) {

    $.Indicator.left = (_index * $.width) + "dp";
    $.Indicator.width = $.width + "dp";

    var children = $.Tabs.children;
    for (var i = 0; i < children.length; i++) {
        Ti.API.info('$.Tabs.children[i].children[1]' + JSON.stringify($.Tabs.children[i].children[0]));

        if ($.Tabs.children[i].children[0].text || '') {
            $.Tabs.children[i].children[0].color = color_text;
        } else {
            $.Tabs.children[i].children[0].image = $.Tabs.children[i].children[0].normalicon;
        }

        $.Tabs.children[i].children[1].color = color_text;
        if (i === _index) {
            if ($.Tabs.children[i].children[0].text || '') {
                $.Tabs.children[i].children[0].color = color_active;
            } else {
                $.Tabs.children[i].children[0].image = $.Tabs.children[i].children[0].activeicon;
            }
            $.Tabs.children[i].children[1].color = color_active;

        }

    }

    moreClose();
};

/**
 * Handles the click event on the 'more' tab
 * @param {Object} _event The event
 * @private
 */
function moreEvent(_event) {
    if ($.moreOpen) {

        var animation = Titanium.UI.createAnimation({
            height : "60dp",
            duration : 100,
            curve : Titanium.UI.ANIMATION_CURVE_EASE_IN
        });

        $.Wrapper.animate(animation);

        $.moreOpen = false;
    } else {
        $.moreOpen = true;

        var animation = Titanium.UI.createAnimation({
            height : Ti.UI.SIZE,
            duration : 100,
            curve : Titanium.UI.ANIMATION_CURVE_EASE_IN
        });

        $.Wrapper.animate(animation);
    }
};

/**
 * Closes the 'more' tab
 * @private
 */
function moreClose() {
    $.Wrapper.height = "60dp";
    $.moreOpen = false;
};
exports.createRadioButtonGroup = function(arg) {
    var selectedIndex = arg.selectedIndex || [];
    var selectedValue = arg.selectedValue || [];
    Ti.API.info('selectedValue ' + selectedValue.toString());
    var self = Ti.UI.createView({
        width : arg.width,
        height : arg.height,
        groupId : arg.groupId,
        layout : arg.layout,
        top : 10,
        left : arg.left,
        selectedIndex : selectedIndex,
        selectedValue : selectedValue,
    });
    Ti.API.info('arg.radioItemsValue' + arg.radioItemsValue);
    for (var i = 0,
        count = arg.radioItemsValue.length; i < count; i++) {

        Ti.API.info('arg.radioItemsValue[i] ' + arg.radioItemsValue[i]);
        var radioItem = Ti.UI.createView({

            height : Ti.UI.SIZE,
            width : '48%',
            bottom : 5,
            left : i % 2 == 0 ? '1%' : '2%',
            top : 5,
            layout : arg.layout,
            id : i,
            is_parent : 1,
        });
        var radioItemImage = Ti.UI.createImageView({
            width : arg.radioItemsWidth,
            height : arg.radioItemsHeight,
            image : selectedValue[0] == arg.radioItemsValue[i] ? arg.radioItemsBackgroundSelectedImage : arg.radioItemsBackgroundImage,
            id : i,
        });
        Ti.API.info('selectedValue[0] === arg.radioItemsValue[i] ' + selectedValue[0] + ' == ' + arg.radioItemsValue[i]);
        radioItem.add(radioItemImage);
        if (arg.radioItemsValue[i] instanceof Object) {

            radioItemImage.height = 0;
            radioItemImage.top = 0;
            var radioItemImage = Ti.UI.createImageView({
                width : 80,
                height : 80,
                image : (arg.radioItemsValue[i]).poll_answer_image,
                top : 05,
                id : i
            });
            radioItem.add(radioItemImage);

            var radioItemLabel = Ti.UI.createLabel({
                width : Ti.UI.SIZE,
                text : (arg.radioItemsValue[i]).poll_answer,
                font : {
                    fontSize : 18,
                },
                color : arg.labelColor.length > 0 ? arg.labelColor : '#000',
                top : 5,
                id : i
            });
            radioItem.add(radioItemLabel);
        } else {

            var radioItemLabel = Ti.UI.createLabel({
                width : Ti.UI.SIZE,
                text : arg.radioItemsValue[i],
                font : {
                    fontSize : 12,

                },
                color : arg.labelColor.length > 0 ? arg.labelColor : '#000',
                left : 10,
                id : i
            });
            radioItem.add(radioItemLabel);
        }
        radioItem.addEventListener('click', function(e) {
            var _parent = this.getParent();

            for (var i = 0,
                count = _parent.children.length; i < count; i++) {
                Ti.API.info('i' + i + 'e.source.id' + e.source.id + '  arg.radioItemsValue[i] :' + arg.radioItemsValue[i]);

                if (i == e.source.id) {
                    _parent.children[i].children[0].setImage(arg.radioItemsBackgroundSelectedImage);
                    //_parent.children[i].backgroundColor = '#ff0000';
                    selectedIndex[0] = i;
                    selectedValue[0] = arg.radioItemsValue[i];

                    _parent.selectedIndex = selectedIndex;
                    _parent.selectedValue = selectedValue;
                    continue;
                }
                if (i == e.source.id && e.source.is_parent == 1) {
                    e.source.children[0].setImage(arg.radioItemsBackgroundSelectedImage);
                    //e.source.backgroundColor = '#ff0000';
                    selectedIndex[0] = i;
                    selectedValue[0] = arg.radioItemsValue[i];

                    _parent.selectedIndex = selectedIndex;
                    _parent.selectedValue = selectedValue;
                    continue;
                } else {
                    _parent.children[i].children[0].setImage(arg.radioItemsBackgroundImage);
                    _parent.children[i].backgroundColor = '#fff';
                }
            }
            Ti.API.info('  _parent.selectedValue :' + _parent.selectedIndex.toString());
        });

        self.add(radioItem);
    }

    return self;
};

exports.createCheckBoxButtonGroup = function(arg) {
    var selectedIndex = arg.selectedIndex || [];
    var selectedValue = arg.selectedValue || [];
    var self = Ti.UI.createView({
        width : arg.width,
        height : arg.height,
        groupId : arg.groupId,
        layout : arg.layout,
        top : 5,
        left : arg.left,
        selectedIndex : selectedIndex,
        selectedValue : selectedValue,
    });
    for (var i = 0,
        count = arg.radioItemsValue.length; i < count; i++) {

        var radioItem = Ti.UI.createView({
            width : Ti.UI.SIZE,
            height : Ti.UI.SIZE,
            top : 5,
            left : 2,
            id : i,
            status : false,
            layout : 'horizontal',
        });
        var radioItemImage = Ti.UI.createImageView({
            width : arg.radioItemsWidth,
            height : arg.radioItemsHeight,
            image : textFilter(selectedValue, arg.radioItemsValue[i]) ? arg.radioItemsBackgroundSelectedImage : arg.radioItemsBackgroundImage,

            left : 0,
            id : i,
            status : false,
        });
        radioItem.add(radioItemImage);
        var radioItemLabel = Ti.UI.createLabel({
            width : Ti.UI.SIZE,
            text : arg.radioItemsValue[i],
            font : {
                fontSize : 10
            },
            color : arg.labelColor.length > 0 ? arg.labelColor : '#000',
            left : 2,
            id : i,
            status : false,
        });
        radioItem.add(radioItemLabel);

        radioItem.addEventListener('singletap', function(e) {
            var _parent = this.getParent(),
                i = e.source.id;

            e.source.status = e.source.status == true ? false : true;
            if (e.source.status == true) {
                _parent.children[i].children[0].setImage(arg.radioItemsBackgroundSelectedImage);
                selectedIndex[selectedIndex.length] = i;
                selectedValue[selectedValue.length] = arg.radioItemsValue[i];
            } else {
                var array_index = selectedIndex.indexOf(i);
                selectedIndex.splice(array_index, 1);
                selectedValue.splice(array_index, 1);
                _parent.children[i].children[0].setImage(arg.radioItemsBackgroundImage);
            }
            _parent.selectedValue = selectedValue;
            _parent.selectedIndex = selectedIndex;
            Ti.API.info('  _parent.selectedValue :' + _parent.selectedValue.toString());

        });

        self.add(radioItem);
    }

    return self;
};
var textFilter = function(array, string) {

    Ti.API.info('textFilter.array ' + JSON.stringify(array) + ' string ' + string);

    for (var i = 0,
        j = array.length; i < j; i++) {
        var phr = array[i];
        Ti.API.info('(phr.id) === parseInt(string) ' + (phr) + "===" + (string) + ((phr) === (string)));
        if ((phr) == (string)) {
            return true;
        }
    };

    return false;
};

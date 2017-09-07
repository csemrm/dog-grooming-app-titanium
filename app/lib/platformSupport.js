var dpi = 0;
// Get Screen DPi
var getScreenDpi = function() {
	if (dpi == 0 | dpi == null) {
		dpi = Ti.Platform.displayCaps.dpi;
	}
	return dpi;
};
exports.getScreenDpi = getScreenDpi;

var width = 0;
// Get Current Screen Width
var getScreenWidth = function() {

	width = Ti.Platform.displayCaps.platformWidth;

	if (!OS_IOS) {
		width = convertPxtoDp(width);
	}

	return width;
};
exports.getScreenWidth = getScreenWidth;

var height = 0;
// Get Current Screen Height
var getScreenHeight = function() {

	height = Ti.Platform.displayCaps.platformHeight;

	if (!OS_IOS) {
		height = convertPxtoDp(height);
	}
	return height;
};
exports.getScreenHeight = getScreenHeight;

// Get real px from dp
var convertDptoPx = function(dp) {

	return dp * (getScreenDpi() / 160);
};
exports.convertDptoPx = convertDptoPx;

// Get dp px from dp
var convertPxtoDp = function(px) {

	return px / (getScreenDpi() / 160);
};
exports.convertPxtoDp = convertPxtoDp;

var osVersion = Ti.Platform.version;
// get current os is ios7
var isiOS7Plus = function() {
	var osName = osVersion;
	var version = 0;

	if (osName != null)
		version = osVersion.split(".");

	var major = parseInt(version[0], 10);

	// Can only test this support on a 3.2+ device
	if (major >= 7)
		return true;
	else
		return false;
};
exports.isiOS7Plus = isiOS7Plus;

// return screen is portrait or landscape
var isPortrait = function() {
	var isPortrait = false;

	if (Titanium.UI.orientation == 1 || Titanium.UI.orientation == 2) {
		isPortrait = true;
	}
	
	return isPortrait;
};
exports.isPortrait = isPortrait;

// param : image
// this function will return of image width and height
exports.getImageSize = function(imagePath) {

    var size = [];

    var tmpImgView = Ti.UI.createImageView({
        image : imagePath,
        width : 'auto',
        height : 'auto'
    });
    img = tmpImgView.toBlob();

    if (null == img) {
        size.width = 100;
        size.height = 100;
    } else {
        size.width = img.width;
        size.height = img.height;
    }

    // clear view
    tmpImgView = null;
	//alert("size : " + size.width);
    return size;
};

var getGridPhotoSize = function(size, viewSize) {
    var MSize = [];
    if (size.height < size.width) {
        // MSize.width = viewSize;
        // MSize.height = (size.height / size.width) * MSize.width;
        MSize.height = viewSize.height;
        MSize.width = (size.width / size.height) * MSize.height;
        
        if(MSize.width < viewSize.width){
        	var space = viewSize.width - MSize.width;
        	
        	var spaceForH = (MSize.width / MSize.height) * space;
        	
        	MSize.height += spaceForH;
        	MSize.width += space;
        }
        

    } else {
    	MSize.width = viewSize.width;
        MSize.height = (size.height / size.width) * MSize.width;
        
        if(MSize.height < viewSize.height){
        	var space = viewSize.height - MSize.height;
        	var spaceForW = (MSize.height / MSize.width) * space;
        	
        	MSize.height += space;
        	MSize.width += spaceForW;
        }

    }
    // MSize.height = getDpPX(MSize.height);
    // MSize.width = getDpPX(MSize.width);
    return MSize;
};
exports.getGridPhotoSize = getGridPhotoSize;
var getGridPhotoSizeCalWidth = function(size, viewSize) {
	var MSize = [];
	
	MSize.width = viewSize;
    MSize.height = (size.height / size.width) * MSize.width;
    
    return MSize;
};
exports.getGridPhotoSizeCalWidth = getGridPhotoSizeCalWidth;

exports.setNormalFontForTablet = function(obj,fs) {
	obj.font = {fontSize:fs, fontFamily: 'Monda-Regular'}; 
};

exports.setBoldFontForTablet = function(obj,fs) {
	obj.font = {fontSize:fs, fontFamily: 'Monda-Regular', fontWeight: 'bold'}; 
};

var getThumbPhotoSize = function(size, viewSize) {

    var MSize = [];

    if (isPortraitImage(size)) {
        MSize.width = viewSize.width;
        MSize.height = (size.height / size.width) * MSize.width;
    } else {
        MSize.height = viewSize.height;
        MSize.width = ((size.width / size.height) * MSize.height);
    }

    return MSize;

};
exports.getThumbPhotoSize = getThumbPhotoSize;

var isPortraitImage = function(size) {
	if(size.height>size.width) {
		return true;
	} else {
		return false;
	}
};
exports.isPortraitImage = isPortraitImage;

exports.hideActionBar = function(win) {
	if(Ti.Platform.osname == "android") {
		win.activity.actionBar.hide();
	}
};

exports.getCoordinate = function(point,type) {
	var splitsPoint = point.split(",");
	if(type=="lat"){
		return splitsPoint[0];
	}else{
		return splitsPoint[1];
	}
};

exports.toMysqlDateFormat = function() {
	var date;
	date = new Date();
	date = date.getUTCFullYear() + '-' +
	    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
	    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
	    ('00' + date.getUTCHours()).slice(-2) + ':' + 
	    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
	    ('00' + date.getUTCSeconds()).slice(-2);
	return date;
};

exports.readMoreText = function(limit, textValue ) {
	var limit        = limit,
	    text         = textValue,
	    word,
	    letter_count = 0,
	    trunc        = '',
	    i            = 0;
	
	while (i < text.length && letter_count < limit) {
	  word         = text[i++];
	  trunc       += word +'';
	  letter_count = trunc.length-1;
	
	}
	
	trunc = trunc.trim()+'...';
	console.log("After Read More Text : " + trunc);
	return trunc;
};

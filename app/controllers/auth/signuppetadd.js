// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.signuppetadd.add(Alloy.createController('pets/addpet', {
    win : $.signuppetadd
}).getView());

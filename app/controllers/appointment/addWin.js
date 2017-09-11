// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

inti();

function inti() {
    $.navigationBar.setBackgroundColor(Alloy.CFG.apptheme.top_nev_bar_bg);

    $.navigationBar.showBack(function(_event) {
        $.addWin.close();
    });
}

$.mapContainner.add(Alloy.createController('appointment/add', args).getView());

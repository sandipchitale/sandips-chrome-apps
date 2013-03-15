window.onresize = doLayout;
onload = function() {
    var webview = document.querySelector('webview');
    doLayout();
}
function doLayout() {
    var webview = document.querySelector('webview');
    webview.style.width = document.documentElement.clientWidth + 'px';
    webview.style.height = document.documentElement.clientHeight + 'px';
}

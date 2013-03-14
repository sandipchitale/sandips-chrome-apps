window.onresize = doLayout;
onload = function() {
    var webview = document.querySelector('webview');
    doLayout();
}
function doLayout() {
    var webview = document.querySelector('webview');
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var webviewWidth = windowWidth;
    var webviewHeight = windowHeight;

    webview.style.width = webviewWidth + 'px';
    webview.style.height = webviewHeight + 'px';
}

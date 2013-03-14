window.onresize = doLayout;

onload = function() {
    doLayout();
    var info = document.querySelector("#info");
    var webview = document.querySelector('webview');
    var port = document.querySelector("#port");
    var host = document.querySelector("#host");
    var urlport = document.querySelector("#urlport");
    var reconnect = document.querySelector("#reconnect");
    
    port.onchange = function() {
        urlport.textContent = port.value;
    }
    
    reconnect.onclick = function() {
        webview.src = "http://"+ host.value + ":" + port.value;
    }
    
    info.onclick = function() {
        webview.src = "https://developers.google.com/chrome-developer-tools/docs/contributing";
    }
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
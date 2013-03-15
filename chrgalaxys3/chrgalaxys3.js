String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};
onload = function() {
    var webview = document.querySelector("#chrome");

    var address = document.querySelector("#address");
    address.value = webview.src;
    
    var clock = document.querySelector("#clock");
    function getClockTime()
    {
       var now    = new Date();
       var hour   = now.getHours();
       var minute = now.getMinutes();
       var seconds = now.getSeconds();
       if (hour   > 12) { hour = hour - 12;      }
       if (hour   == 0) { hour = 12;             }
       if (minute < 10) { minute = "0" + minute; }
       setTimeout(function() {clock.textContent = getClockTime();}, (60 - seconds)*1000);
       return (hour + ':' + minute);
    }
    clock.textContent = getClockTime();
    
    address.onkeypress = function(e)
    {
        if(e.keyCode === 13)
        {
            var url = address.value.trim();
            if (url.length > 0) {
                if (url.indexOf(' ') >= 0) {
                    url = "https://www.google.com/search?q=" + url.split(' ').join('+');
                } else {
                    var lowercaseUrl = url.toLowerCase();
                    if (!(lowercaseUrl.indexOf("http:") === 0 ||
                        lowercaseUrl.indexOf("file:") === 0 ||
                        lowercaseUrl.indexOf("https:") === 0 ||
                        lowercaseUrl.indexOf("chrome:") === 0)){
                        url = "http://" + url;
                    }
                }
                webview.src = url;
                webview.focus();
            }
        }
    }

    function adjustBackAndForwardAfterStop() {
         address.value = webview.src;
         adjustBackAndForwardAfterAbort();
    }

    function adjustBackAndForwardAfterAbort() {
    }

    webview.addEventListener("loadabort", adjustBackAndForwardAfterAbort);
    webview.addEventListener("loadstop", adjustBackAndForwardAfterStop);

    document.body.onclick = function(e) {
        if (e.x > 120 && e.x < 140 && e.y > 480 && e.y < 500) {
            window.close();
        } else if (e.x > 200 && e.x < 215 && e.y > 485 && e.y < 495) {
            if (webview.canGoBack()) {
                webview.stop();
                webview.back();
            }
        }
    }
}

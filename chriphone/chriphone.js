String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};
onload = function() {
    var webview = document.querySelector("#chrome");
    
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
    
    var backButton = document.querySelector("#back");
    backButton.disabled = true;
    var backButtonCell = document.querySelector("#backcell");
    var forwardButton = document.querySelector("#forward");
    forwardButton.disabled = true;
    var forwardButtonCell = document.querySelector("#forwardcell");
    var address = document.querySelector("#address");
    address.value = webview.src;
    var settingsButton = document.querySelector("#settings");
    var settingsButtonCell = document.querySelector("#settingscell");
    
    backButton.onclick = function() {
        if (webview.canGoBack()) {
            webview.stop();
            webview.back();
        }    
    }
    
    forwardButton.onclick = function() {
        if (webview.canGoForward()) {
            webview.stop();
            webview.forward();
        }    
    }
    
    address.onfocus = function() {
        backButtonCell.style.display = 'none';
        forwardButtonCell.style.display = 'none';
        settingsButtonCell.style.display = 'none';
        address.size = 32;
    }
    
    address.onblur = function() {
        backButtonCell.style.display = 'inline';
        if (webview.canGoForward()) {
            forwardButtonCell.style.display = 'inline';
        } else {
            forwardButtonCell.style.display = 'none';
        }
        settingsButtonCell.style.display = 'inline';
        if (webview.canGoForward()) {
            address.size = 18;
        } else {
            address.size = 23;
        }
    }
    
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
        backButton.disabled = !webview.canGoBack();
        if (webview.canGoForward()) {
            forwardButton.disabled = false;
        } else {
            forwardButton.disabled = true;            
        }
    }
    
    webview.addEventListener("loadabort", adjustBackAndForwardAfterAbort);
    webview.addEventListener("loadstop", adjustBackAndForwardAfterStop);
    
    document.body.onclick = function(e) {
        if (e.x > 120 && e.x < 140 && e.y > 492 && e.y < 512) {
            window.close();
        }
    }
}

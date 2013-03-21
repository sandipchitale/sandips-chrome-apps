window.onresize = doLayout;
onload = function() {
    var canvas = document.querySelector('#canvas');
    doLayout();
    canvas.addEventListener('click', function(e) {
        chrome.runtime.getBackgroundPage(function(backgroundPage) {
            if ((e.x >= window.outerWidth/3) &&
                (e.x < (2*window.outerWidth)/3) &&
                (e.y >= window.outerHeight/3) &&
                (e.y < (2*window.outerHeight)/3)) {
                window.close();
                return;
            }
            backgroundPage.postMessage({
                sx : window.screenX,
                sy : window.screenY,
                w : window.outerWidth,
                h : window.outerHeight,
                x : e.x,
                y : e.y
            }, "*");
        });
    });
};

function doLayout() {
    var canvas = document.querySelector('#canvas');
    canvas.style.width = document.documentElement.clientWidth + 'px';
    canvas.style.height = (document.documentElement.clientHeight) + 'px';
}
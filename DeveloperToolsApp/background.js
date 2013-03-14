chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('inspectorwrapper.html', {
        'width' : 700,
        'height' : 600
    });
});
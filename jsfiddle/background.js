chrome.app.runtime.onLaunched.addListener(function() {
    runApp();
});

chrome.app.runtime.onRestarted.addListener(function() {
    runApp();
});

function runApp() {
    chrome.app.window.create('jsfiddlewrapper.html', {
        'width' : 700,
        'height' : 500
    });
}

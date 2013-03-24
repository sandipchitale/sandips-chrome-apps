chrome.app.runtime.onLaunched.addListener(function() {
    runApp();
});

chrome.app.runtime.onRestarted.addListener(function() {
    runApp();
});

function runApp() {
    chrome.app.window.create('manifest2editor.html', {
        'width' : 1100,
        'height' : 500,
        'frame' : 'none'
    });
}

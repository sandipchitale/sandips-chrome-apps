chrome.app.runtime.onLaunched.addListener(function() {
    chrgalaxys4();
});

chrome.app.runtime.onRestarted.addListener(function() {
    chrgalaxys4();
});

function chrgalaxys4() {
    chrome.app.window.create('chrgalaxys4.html', {
        'width' : 288,
        'height' : 563,
        'frame' : 'chrome'
    });
}
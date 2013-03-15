chrome.app.runtime.onLaunched.addListener(function() {
    chrgalaxys3();
});

chrome.app.runtime.onRestarted.addListener(function() {
    chrgalaxys3();
});

function chrgalaxys3() {
    chrome.app.window.create('chrgalaxys3.html', {
        'width' : 265,
        'height' : 518,
        'frame' : 'none'
    });
}
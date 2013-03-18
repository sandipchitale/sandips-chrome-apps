chrome.app.runtime.onLaunched.addListener(function() {
    chrgalaxys3();
});

chrome.app.runtime.onRestarted.addListener(function() {
    chrgalaxys3();
});

function chrgalaxys3() {
    chrome.app.window.create('chrgalaxys3.html', {
        'width' : 265,
        'minWidth' : 265,
        'maxWidth' : 265,
        'height' : 518,
        'minHeight' : 518,
        'maxHeight' : 518,
        'frame' : 'none'
    });
}
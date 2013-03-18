chrome.app.runtime.onLaunched.addListener(function() {
    chrgalaxys4();
});

chrome.app.runtime.onRestarted.addListener(function() {
    chrgalaxys4();
});

function chrgalaxys4() {
    chrome.app.window.create('chrgalaxys4.html', {
        'width' : 288,
        'minWidth' : 288, 
        'maxWidth' : 288, 
        'height' : 563,
        'minHeight' : 563,
        'maxHeight' : 563,
        'frame' : 'none'
    });
}
chrome.app.runtime.onLaunched.addListener(function() {
    chriphone();
});

chrome.app.runtime.onRestarted.addListener(function() {
    chriphone();
});

function chriphone() {
    chrome.app.window.create('chriphone.html', {
        'width' : 258,
        'minWidth' : 258,
        'maxWidth' : 258,
        'height' : 544,
        'minHeight' : 544,
        'maxHeight' : 544,
        'frame' : 'none'
    });
}
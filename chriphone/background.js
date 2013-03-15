chrome.app.runtime.onLaunched.addListener(function() {
    chriphone();
});

chrome.app.runtime.onRestarted.addListener(function() {
    chriphone();
});

function chriphone() {
    chrome.app.window.create('chriphone.html', {
        'width' : 258,
        'height' : 544,
        'frame' : 'none'
    });
}
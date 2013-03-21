chrome.app.runtime.onLaunched.addListener(function() { debugger;
    launch();
});

function launch() {
    chrome.app.window.create('panel.html', {
        'width' : 200,
        'height' : 200,
        'frame' : 'none'
    });
};

function processMessage(e) {
    var data = e.data;
    var nx = data.sx;
    var ny = data.sy;
    var nw = data.w;
    var nh = data.h;

    var dx = 0;
    var dy = 0;
    if ((data.x >= nw/3) &&
        (data.x < (2*nw)/3) &&
        (data.y >= nh/3) &&
        (data.y < (2*nh)/3)) {
        window.close();
        return;
    } else if ((data.x >= 0) &&
        (data.x < nw/3) &&
        (data.y >= 0) &&
        (data.y < nh/3)) {
        dx = -2 - nw;
        dy = -2 - nh;
    } else if ((data.x >= nw/3) &&
        (data.x < (2*nw)/3) &&
        (data.y >= 0) &&
        (data.y < nh/3)) {
        dy = -2 - nh;
    } else if ((data.x >= 0) &&
        (data.x < nw/3) &&
        (data.y >= nh/3) &&
        (data.y < (2*nh)/3)) {
        dx = -2 - nw;
    } else if ((data.x >= (2*nw)/3) &&
        (data.x < nw) &&
        (data.y >= 0) &&
        (data.y < nh/3)) {
        dx = 2 + nw;
        dy = -2 - nh;
    } else if ((data.x >= 0) &&
        (data.x < nw/3) &&
        (data.y >= (2*nh)/3) &&
        (data.y < nh)) {
        dx = -2 - nw;
        dy = 2 + nh;
    } else if ((data.x >= (2*nw)/3) &&
        (data.x < nw) && 
         (data.y >= nh/3) &&
        (data.y < (2*nh)/3)) {
        dx = 2 + nw;
    }  else if ((data.x >= nw/3) &&
        (data.x < (2*nw)/3)&& 
        (data.y >= (2*nh)/3) &&
        (data.y < nh)) {
        dy = 2 + nh;
    } else if ((data.x >= (2*nw)/3) &&
        (data.x < nw) &&
        (data.y >= (2*nh)/3) &&
        (data.y < nh)) {
        dx = 2 + nw;
        dy = 2 + nh;
    }
    chrome.app.window.create('panel.html', {
        'bounds' : {
            'left' : (nx + dx),
            'top' : (ny + dy),
            'width' : nw,
            'height' : nh
        },
        'frame' : 'none'
    });
}

window.addEventListener('message', processMessage); 
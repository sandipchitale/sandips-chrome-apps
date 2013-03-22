chrome.app.runtime.onLaunched.addListener(function() { debugger;
    launch();
});

function launch() {
    showPanel(200, 200);
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
    showPanel(nw, nh, (nx + dx), (ny + dy));
}

var panels = [];
function showPanel(w, h, left, top) {
    var createOptions = {
        'width' : w,
        'height' : h,
        'frame' : 'none'
    };
    
    if (left) {
        createOptions.left = left;
    }
    if (top) {
        createOptions.top = top;
    }
    
    chrome.app.window.create('panel.html', createOptions, function(panel) {
        panels.push(panel);
        var focusing = false;
        panel.contentWindow.onfocus = function() {
            if (focusing) {
                return;
            }
            focusing = true;
            for (var i = 0; i < panels.length; i++) {
                if (panels[i].contentWindow.CLOSED === true) {
                    var index = panels.indexOf(panels[i]);
                    if(index!=-1){
                       panels.splice(index, 1);
                    }
                } else {
                    panel[i].focus();
                }
            }
            focusing = false;
        }
    });
}

window.addEventListener('message', processMessage); 
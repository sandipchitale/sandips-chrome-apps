window.onresize = doLayout;
window.CLOSED = false;
onload = function() {
    var canvas = document.querySelector('#canvas');
    doLayout();

    start();

    canvas.addEventListener('click', function(e) {
        if (window === top) {
            chrome.runtime.getBackgroundPage(function(backgroundPage) {
                backgroundPage.postMessage({
                    sx : window.screenX,
                    sy : window.screenY,
                    w : window.outerWidth,
                    h : window.outerHeight,
                    x : e.x,
                    y : e.y
                }, "*");
            });
        }
    });

    var closer = document.querySelector('#closer');
    if (window === top) {
        closer.addEventListener('click', function(e) {
            window.CLOSED = true;
            window.close();
            return;
        });
    } else {
        closer.parentNode.removeChild(closer);
    }

    var mover = document.querySelector('#mover');
    if (window === top) {
    } else {
        mover.parentNode.removeChild(mover);
    }
};

function doLayout() {
    var canvas = document.querySelector('#canvas');
    canvas.style.width = document.documentElement.clientWidth + 'px';
    canvas.style.height = (document.documentElement.clientHeight) + 'px';
}

// Code below is based on http://www.efeion.com/canvastest/balls1.js

var WIDTH;
var HEIGHT;
var g;
var carray = new Array();
var bg;

function start() {
    g = document.querySelector('#canvas').getContext("2d");
    bg = randomColor(128, 128, 128);
    WIDTH = document.querySelector('#canvas').width;
    HEIGHT = document.querySelector('#canvas').height;
    carray[0] = new Circle(Math.random() * 200, Math.random() * 200, 64, randomColor(255, 0, 0));
    carray[0] = new Circle(Math.random() * 200, Math.random() * 200, 48, randomColor(255, 0, 0));
    carray[0] = new Circle(Math.random() * 200, Math.random() * 200, 32, randomColor(255, 0, 0));
    carray[1] = new Circle(Math.random() * 200, Math.random() * 200, 24, randomColor(255, 0, 0));
    carray[2] = new Circle(Math.random() * 200, Math.random() * 200, 16, randomColor(255, 0, 0));
    carray[3] = new Circle(Math.random() * 200, Math.random() * 200, 8,  randomColor(255, 0, 0));
    var factor = (Math.random() * new Date().getMilliseconds()) % 1.0;

    return setInterval(draw, 50 + (factor * 80));
}

// Draw Function
function draw() {
    clear();
    var i;
    for ( i = 0; i < carray.length; i++) {
        carray[i].move();
        carray[i].draw();
    }
}

function clear() {
    g.fillStyle = bg;
    g.fillRect(0, 0, WIDTH, HEIGHT);
}

function randomColor(r, g, b) {
    var factor = (Math.random() * new Date().getMilliseconds()) % 1.0;
    return "rgb(" + (factor * r).toFixed(0) + "," + (factor * g).toFixed(0) + "," + (factor * b).toFixed(0) + ")";
}

// Circle Class
function Circle(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.dx = Math.ceil(Math.random() * 7);
    this.dy = Math.ceil(Math.random() * 7);

    this.draw = function() {
        g.beginPath();
        g.fillStyle = this.c;
        g.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        g.closePath();
        g.fill();
    }

    this.getX = function() {
        return this.x;
    }

    this.getY = function() {
        return this.y;
    }

    this.move = function() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x > WIDTH || this.x < 0) {
            this.dx = this.dx * -1;
        }

        if (this.y > HEIGHT || this.y < 0) {
            this.dy = this.dy * -1;
        }
    }
}


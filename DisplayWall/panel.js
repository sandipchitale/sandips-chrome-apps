window.onresize = doLayout;
onload = function() {
    var canvas = document.querySelector('#canvas');
    doLayout();

    start();

    canvas.addEventListener('click', function(e) {
        chrome.runtime.getBackgroundPage(function(backgroundPage) {
            if ((e.x >= window.outerWidth / 3) && (e.x < (2 * window.outerWidth) / 3) && (e.y >= window.outerHeight / 3) && (e.y < (2 * window.outerHeight) / 3)) {
                window.close();
                return;
            }
            backgroundPage.postMessage({
                sx : window.screenX,
                sy : window.screenY,
                w : window.outerWidth,
                h : window.outerHeight,
                x : e.x,
                y : e.y
            }, "*");
        });
    });

    canvas.addEventListener('keydown', onKeyDown);
    canvas.addEventListener('keyup', onKeyDown);
};

function doLayout() {
    var canvas = document.querySelector('#canvas');
    canvas.style.width = document.documentElement.clientWidth + 'px';
    canvas.style.height = (document.documentElement.clientHeight) + 'px';
}

var WIDTH;
var HEIGHT;
var g;
var rightDown = false;
var leftDown = false;
var carray = new Array();
var bg;

// Main Function To Start
function start() {
    g = document.querySelector('#canvas').getContext("2d");
    bg = randomColor(128, 128, 128);
    WIDTH = document.querySelector('#canvas').width;
    HEIGHT = document.querySelector('#canvas').height;
    carray[0] = new Circle(Math.random() * 200, Math.random() * 200, 64, randomColor(128, 128, 128));
    carray[1] = new Circle(Math.random() * 200, Math.random() * 200, 32, randomColor(128, 128, 128));
    carray[2] = new Circle(Math.random() * 200, Math.random() * 200, 16, randomColor(128, 128, 128));
    carray[3] = new Circle(Math.random() * 200, Math.random() * 200, 8,  randomColor (128, 128, 128));
    return setInterval(draw, 100);
}

function randomColor(r, g, b) {
    var factor = (Math.random() * new Date().getMilliseconds()) % 1.0;
    return "rgb(" + (factor * r).toFixed(0) + "," + (factor * g).toFixed(0) + "," + (factor * b).toFixed(0) + ")";
}

// Get Key Input
function onKeyDown(evt) {
    if (evt.keyCode == 39)
        rightDown = true;
    else if (evt.keyCode == 37)
        leftDown = true;
    dx = dx * -1;
}

function onKeyUp(evt) {
    if (evt.keyCode == 39)
        rightDown = false;
    else if (evt.keyCode == 37)
        leftDown = false;
    dx = dx * -1;
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
        return x;
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



function init() {
    ctx = document.getElementById("hopover").getContext('2d');
    loader.addImage('lake_grass', 'lake_moon.PNG');
    loader.addImage('red_frog', 'green_frog.png');
    loader.addImage('blue_frog', 'brown_frog.png');

    loader.loadImages(function() {
        var puzzle = new Hopover();
    });
 
    createjs.Sound.registerSound({id:"frog_sound", src:"mm/frog.mp3"});
}

function getMousePos(mouseEvent) {
    var rect = ctx.canvas.getBoundingClientRect();
    return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
    };
}

Hopover = function() {
    _self = this;
    this.reset();

    ctx.canvas.addEventListener('click', this.onClick);
    document.getElementById('reset').addEventListener('click', this.onReset);
}

Hopover.prototype.reset = function() {
    document.querySelector('#txtGameover').innerHTML = "";

    this.pegs = [1, 1, 1, 0, 2, 2, 2];
    this.draw();    
}

Hopover.prototype.gameOver = function() {
}

Hopover.prototype.drawLilyPads = function() {
    for (var i = 0; i < this.pegs.length; i++) {
        ctx.beginPath();
        ctx.arc((i * 72) + 60, 240, 36, 0, Math.PI * 2, true);
        ctx.closePath();

        ctx.fillStyle = '#68f312';
        ctx.fill();

        ctx.strokeStyle = '#449f0d';
        ctx.stroke();
    }
}

Hopover.prototype.drawFrogs = function() {
    for (var i = 0; i < this.pegs.length; i++) {
        switch (this.pegs[i]) {
            case 1:
                ctx.drawImage(loader.getImage('red_frog'), (i * 85) + 24, 180, 60, 60);
                break;

            case 2:
                ctx.drawImage(loader.getImage('blue_frog'), (i * 85) + 24, 180, 60, 60);
                break;
        }
    }
}

Hopover.prototype.draw = function() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(loader.getImage('lake_grass'), 0, 0);
    //this.drawLilyPads();
    this.drawFrogs();
}

Hopover.prototype.moveFrog = function(x, y) {
    var col = Math.floor(x / 85);
    var dir = 0;

    if (this.pegs[col] > 0) {
        if (this.pegs[col] == 1) {
            dir = 1;
        } else {
            dir = -1;
        }

        for (var delta = 1; delta < 3; delta++) {
            if (this.pegs[col + (dir * delta)] == 0) {
                this.pegs[col + (dir * delta)] = this.pegs[col];
                this.pegs[col] = 0;
            }
        }

    
        this.draw();

        if (this.isGameOver()) {
            this.gameOver();
        }
    }
}

Hopover.prototype.isGameOver = function() 
{
    var dir = 0;

    for (var i = 0; i < this.pegs.length; i++) {
        if (this.pegs[i] > 0) {
            if (this.pegs[i] == 1) {
                dir = 1;
            } else {
                dir = -1;
            }

            for (var delta = 1; delta < 3; delta++) {
                if (this.pegs[i + (dir * delta)] == 0) {
                    return false;
                }
            }
        }
    }  

    return true;
}

Hopover.prototype.openDialog = function(msg, color) {
    var oCtl = document.querySelector('#txtGameover');
    oCtl.innerHTML = msg;
    oCtl.style.color = color;
}

Hopover.prototype.gameOver = function() {

    var win = [2, 2, 2, 0 ,1 ,1 ,1]
    
    if (win.toString() == this.pegs.toString()) {
        msg = 'Congratulations you solved the puzzle!';
	    _self.openDialog(msg, 'green');
    } else {
        msg = 'Sorry the frogs are stuck - try again!';
	    _self.openDialog(msg, 'red');
    }

}

Hopover.prototype.onClick = function(e) {
    var pos = getMousePos(e);
    if (pos.y >= 180 && pos.y <= 275) {
         createjs.Sound.play("frog_sound");
    
        _self.moveFrog(pos.x, pos.y);
    }
}

Hopover.prototype.onReset = function(e) {
    _self.reset();
}

var ctx = null;
var loader = new ImageLoader();
window.addEventListener('DOMContentLoaded', function(e) { init(); });
function collision (rectA, rectB) {
  return rectA.y + rectA.height >= rectB.y
     &&  rectA.y <= rectB.y + rectB.height
     &&  rectA.x + rectA.width >= rectB.x
     &&  rectA.x <= rectB.x + rectB.width;
}


var myCanvas = document.querySelector(".flappy-canvas");
var ctx = myCanvas.getContext("2d");

// Our Celine object and her image
var celineImg = new Image();
celineImg.src = "./images/celine.webp";

var celine = {
  x: 0,
  y: 285,
  width: 100,
  height: 81,
  isCrashed: false,
  drawMe: function () {
    ctx.drawImage(celineImg, this.x, this.y, this.width, this.height);
  },
  controlBoundries: function () {
    if (this.x < 0) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = 0;
    }

    if (this.x > 1000 - this.width) {
      this.x = 1000 - this.width;
    }

    if (this.y > 650 - this.height) {
      this.y = 650 - this.height;
    }
  }
};


// Our first pipe
var pipe1 = {
  x: 970,
  y: 0,
  width: 30,
  height: 300,
  isCrashed: false,
  drawMe: function () {
    if (this.isCrashed) {
      // if this pipe has crashed don't move the the left and draw as red
      ctx.fillStyle = "crimson";
    }
    else {
      // if the pipe is still good continue to move and draw as green

      // decrease the x to animate a leftward movement
      this.x -= 2;
      // if pipe is off-screen reset it back to the right
      if (this.x < -this.width) {
        this.x = 1000;
      }

      ctx.fillStyle = "#057e04";
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

var gameOver = {
  x: 311,
  y: 325,
  opacity: 0,
  drawMe: function () {
    if (this.opacity < 1) {
      this.opacity += 0.01;
    }

    // fade in the text with globalAlpha
    ctx.globalAlpha = this.opacity;
    ctx.font = "bold 70px monospace";

    ctx.fillStyle = "red";
    ctx.fillText("Game Over", this.x, this.y);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "rebeccapurple";
    ctx.strokeText("Game Over", this.x, this.y);

    ctx.globalAlpha = 1;
  }
}

// -----------------------------------------------------------------------------

function drawScene () {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  celine.drawMe();
  pipe1.drawMe();

  if (collision(celine, pipe1)) {
    celine.isCrashed = true;
    pipe1.isCrashed = true;
  }

  if (celine.isCrashed) {
    gameOver.drawMe();
  }

  requestAnimationFrame(function () {
    drawScene();
  });
}

drawScene();

// -----------------------------------------------------------------------------

document.onkeydown = function (event) {
  if (celine.isCrashed) {
    // exit the function without moving if Celine is crashed
    return;
  }

  switch (event.keyCode) {
    case 37: // left arrow
      celine.x -= 10;
      break;

    case 32: // space bar
    case 38: // up arrow
      celine.y -= 10;
      break;

    case 39: // right arrow
      celine.x += 10;
      break;

    case 40: // down arrow
      celine.y += 10;
      break;
  }

  celine.controlBoundries();
};
